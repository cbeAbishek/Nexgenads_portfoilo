import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stakeholderType, responses, email, media } = body;

    if (!stakeholderType || !responses) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const enrichedResponses = {
      ...responses,
      ...(media ? { media } : {}),
    };

    const { data, error } = await supabase
      .from('survey_responses')
      .insert([
        {
          stakeholder_type: stakeholderType,
          responses: enrichedResponses,
          email,
          ip_address: request.headers.get('x-forwarded-for') || 'unknown',
          user_agent: request.headers.get('user-agent'),
          metadata: {
            submitted_at: new Date().toISOString(),
            ...(media ? { media } : {}),
          },
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { message: 'Survey submitted successfully!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Survey submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit survey. Please try again later.' },
      { status: 500 }
    );
  }
}
