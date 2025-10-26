import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, company, investmentInterest, message } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('investor_inquiries')
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          company,
          investment_interest: investmentInterest,
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
      { message: 'Investor inquiry submitted successfully!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Investor inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again later.' },
      { status: 500 }
    );
  }
}
