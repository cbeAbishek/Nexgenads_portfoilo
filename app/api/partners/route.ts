import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, company, partnerType, experienceYears, portfolioUrl, message } = body;

    if (!fullName || !email || !phone || !partnerType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('partner_applications')
      .insert([
        {
          full_name: fullName,
          email,
          phone,
          company,
          partner_type: partnerType,
          experience_years: experienceYears ? parseInt(experienceYears) : null,
          portfolio_url: portfolioUrl,
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
      { message: 'Partner application submitted successfully!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Partner application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again later.' },
      { status: 500 }
    );
  }
}
