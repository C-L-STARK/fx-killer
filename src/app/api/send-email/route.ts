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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, useTemplate, templateId, customSubject, customContent, emailLanguage } = body;

    // Get submission data
    const { data: submission, error: submissionError } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (submissionError || !submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    let subject: string;
    let content: string;
    // Use emailLanguage if provided, otherwise fall back to submission language
    const isZh = (emailLanguage || submission.language) === 'zh';

    if (useTemplate && templateId) {
      // Use template
      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (templateError || !template) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }

      subject = isZh ? template.subject_zh : template.subject_en;
      content = isZh ? template.content_zh : template.content_en;

      // Replace variables
      const variables: Record<string, string> = {
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        plan: submission.plan || '',
        price: submission.price_cny ? `${submission.price_cny} / ${submission.price_usd}` : '',
        date: new Date(submission.created_at).toLocaleString(isZh ? 'zh-CN' : 'en-US'),
      };

      subject = replaceVariables(subject, variables);
      content = replaceVariables(content, variables);
    } else {
      // Use custom content
      if (!customSubject || !customContent) {
        return NextResponse.json({ error: 'Subject and content are required' }, { status: 400 });
      }
      subject = customSubject;
      content = customContent;
    }

    // Send email
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"汇刃 FX Killer" <${process.env.MAIL_USER}>`,
      to: submission.email,
      subject,
      html: content,
    });

    // Update submission record
    await supabase
      .from('form_submissions')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', submissionId);

    return NextResponse.json({
      success: true,
      message: `Email sent to ${submission.email}`
    });
  } catch (error: any) {
    console.error('Send email error:', error);
    return NextResponse.json({
      error: error.message || 'Failed to send email'
    }, { status: 500 });
  }
}
