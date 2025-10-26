import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, question } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    if (!question || question.trim().length < 10) {
      return NextResponse.json({ error: 'Please share a little more detail in your question.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('faq_requests')
      .insert([
        {
          full_name: fullName,
          email,
          question,
          metadata: {
            source: 'faq_page',
            user_agent: request.headers.get('user-agent'),
            submitted_from_ip: request.headers.get('x-forwarded-for') || 'unknown',
          },
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Thanks! We will review your question soon.', data }, { status: 201 });
  } catch (error) {
    console.error('FAQ request error:', error);
    return NextResponse.json({ error: 'Unable to submit your question right now.' }, { status: 500 });
  }
}
