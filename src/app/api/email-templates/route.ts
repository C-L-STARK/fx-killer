import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('form_type', { ascending: true });

    if (error) {
      console.error('Fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { form_type, subject_zh, subject_en, content_zh, content_en, is_active } = body;

    if (!form_type || !subject_zh || !subject_en || !content_zh || !content_en) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if template for this form_type already exists
    const { data: existing } = await supabase
      .from('email_templates')
      .select('id')
      .eq('form_type', form_type)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Template for this form type already exists' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('email_templates')
      .insert({
        form_type,
        subject_zh,
        subject_en,
        content_zh,
        content_en,
        is_active: is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
