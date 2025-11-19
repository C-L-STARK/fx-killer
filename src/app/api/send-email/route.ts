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
    const { submissionId, useTemplate, templateId, customSubject, customContent } = body;

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

      // Replace variables for both languages
      const variables: Record<string, string> = {
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        plan: submission.plan || '',
        price: submission.price_cny ? `${submission.price_cny} / ${submission.price_usd}` : '',
        date: new Date(submission.created_at).toLocaleString('zh-CN'),
      };

      const variablesEn: Record<string, string> = {
        ...variables,
        date: new Date(submission.created_at).toLocaleString('en-US'),
      };

      // Create bilingual subject and content
      const subjectZh = replaceVariables(template.subject_zh, variables);
      const subjectEn = replaceVariables(template.subject_en, variablesEn);
      const contentZh = replaceVariables(template.content_zh, variables);
      const contentEn = replaceVariables(template.content_en, variablesEn);

      // Bilingual subject
      subject = `${subjectZh} | ${subjectEn}`;

      // Bilingual content: Chinese first, then English
      content = `
        ${contentZh}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <div style="color: #6b7280; font-size: 12px; margin-bottom: 10px;">English Version / 英文版本</div>
        ${contentEn}
      `;
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
