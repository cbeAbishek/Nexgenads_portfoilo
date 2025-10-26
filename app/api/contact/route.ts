import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, inquiryType, message } = body;

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          subject,
          inquiry_type: inquiryType,
          message,
          metadata: {
            user_agent: request.headers.get('user-agent'),
            submitted_from_ip: request.headers.get('x-forwarded-for') || 'unknown',
          },
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { message: 'Contact form submitted successfully!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again later.' },
      { status: 500 }
    );
  }
}
