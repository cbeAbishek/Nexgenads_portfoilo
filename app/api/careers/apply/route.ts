import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'jobId',
      'jobTitle',
      'fullName',
      'email',
      'phone',
      'currentLocation',
      'experience',
      'resumeLink',
      'coverLetter',
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          missingFields,
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const applicationData = {
      job_id: body.jobId,
      job_title: body.jobTitle,
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      current_location: body.currentLocation,
      experience: body.experience,
      current_company: body.currentCompany || null,
      resume_link: body.resumeLink,
      linkedin_profile: body.linkedinProfile || null,
      portfolio_link: body.portfolioLink || null,
      cover_letter: body.coverLetter,
      applied_at: body.appliedAt || new Date().toISOString(),
      status: 'new',
      metadata: {
        user_agent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      },
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('job_applications')
      .insert([applicationData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          error: 'Failed to submit application',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        applicationId: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          error instanceof Error
            ? error.message
            : (error as { message?: string } | null)?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve applications (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    const status = searchParams.get('status');

    let query = supabase
      .from('job_applications')
      .select('*')
      .order('applied_at', { ascending: false });

    if (jobId) {
      query = query.eq('job_id', jobId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch applications', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ applications: data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details:
          error instanceof Error
            ? error.message
            : (error as { message?: string } | null)?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
