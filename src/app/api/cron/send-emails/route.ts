import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

// Create reusable transporter for Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Replace template variables
const replaceVariables = (template: string, data: Record<string, string>) => {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
  }
  return result;
};

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get unsent submissions
    const { data: submissions, error: fetchError } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('email_sent', false)
      .order('created_at', { ascending: true })
      .limit(50);

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }

    if (!submissions || submissions.length === 0) {
      return NextResponse.json({ message: 'No pending emails', sent: 0 });
    }

    // Get email templates
    const { data: templates, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('is_active', true);

    if (templateError) {
      console.error('Template error:', templateError);
      return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
    }

    const templateMap = new Map(
      templates?.map((t) => [t.form_type, t]) || []
    );

    const transporter = createTransporter();
    let sentCount = 0;
    const errors: string[] = [];

    for (const submission of submissions) {
      const template = templateMap.get(submission.form_type);

      if (!template) {
        console.warn(`No template found for form type: ${submission.form_type}`);
        continue;
      }

      const isZh = submission.language === 'zh';
      const subject = isZh ? template.subject_zh : template.subject_en;
      const content = isZh ? template.content_zh : template.content_en;

      // Prepare template variables
      const variables: Record<string, string> = {
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        plan: submission.plan || '',
        price: submission.price_cny ? `${submission.price_cny} / ${submission.price_usd}` : '',
        date: new Date(submission.created_at).toLocaleString(isZh ? 'zh-CN' : 'en-US'),
      };

      const finalContent = replaceVariables(content, variables);
      const finalSubject = replaceVariables(subject, variables);

      try {
        await transporter.sendMail({
          from: `"汇刃 FX Killer" <${process.env.MAIL_USER}>`,
          to: submission.email,
          subject: finalSubject,
          html: finalContent,
        });

        // Mark as sent
        await supabase
          .from('form_submissions')
          .update({
            email_sent: true,
            email_sent_at: new Date().toISOString(),
          })
          .eq('id', submission.id);

        sentCount++;
      } catch (sendError: any) {
        console.error(`Failed to send email to ${submission.email}:`, sendError);
        errors.push(`${submission.email}: ${sendError.message}`);
      }
    }

    return NextResponse.json({
      message: 'Email sending completed',
      sent: sentCount,
      total: submissions.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
