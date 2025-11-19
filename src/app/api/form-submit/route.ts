import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      formType,
      name,
      email,
      phone,
      message,
      plan,
      priceUsd,
      priceCny,
      paymentMethod,
      language,
    } = body;

    // Validate required fields
    if (!formType || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('form_submissions')
      .insert({
        form_type: formType,
        name,
        email,
        phone,
        message: message || null,
        plan: plan || null,
        price_usd: priceUsd || null,
        price_cny: priceCny || null,
        payment_method: paymentMethod || null,
        language: language || 'zh',
        stage: '面试邀约',
        email_sent: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
