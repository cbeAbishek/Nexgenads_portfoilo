import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = 'unknown' } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('email_subscriptions')
      .insert([
        {
          email,
          source,
          metadata: {
            user_agent: request.headers.get('user-agent'),
            subscribed_from_ip: request.headers.get('x-forwarded-for') || 'unknown',
          },
        },
      ])
      .select();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
