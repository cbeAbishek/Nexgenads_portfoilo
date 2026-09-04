import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { getSession } from '@/lib/auth';

const ALLOWED_ROLES = ['student', 'client', 'intern', 'public'];

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.email) {
      return NextResponse.json(
        { feedback: null, error: 'Not authenticated' },
        { status: 200 }
      );
    }

    const email = request.nextUrl.searchParams.get('email') || session.email;
    if (email !== session.email) {
      return NextResponse.json(
        { feedback: null, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from('feedback_submissions')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    return NextResponse.json(
      { feedback: data?.[0] ?? null },
      { status: 200 }
    );
  } catch (error) {
    console.error('Feedback fetch error:', error);
    return NextResponse.json(
      { feedback: null, error: 'Failed to load feedback' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const {
      role,
      collegeName,
      department,
      year,
      interestedDomain,
      feedback,
      ratings,
      clientService,
      internRole,
      internTime,
      feedbackAbout,
      nexgenadsFollowed,
      onedotgrowFollowed,
      reviewLeft,
    } = body;

    if (!role || !ALLOWED_ROLES.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    if (role === 'student' && !Array.isArray(feedback)) {
      return NextResponse.json(
        { error: 'Invalid feedback payload' },
        { status: 400 }
      );
    }

    // Name + email come from the Google session when available; otherwise fall back
    // to the values the user typed in the form.
    const fullName = body.fullName || session?.name || '';
    const email = body.email || session?.email || '';

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const studentFeedback =
      role === 'student' && Array.isArray(feedback) && Array.isArray(ratings)
        ? feedback
        : [];

    const row: Record<string, unknown> = {
      full_name: fullName,
      email,
      role,
      google_id: session?.googleId || null,
      college_name: role === 'student' ? collegeName || null : null,
      department: role === 'student' ? department || null : null,
      year: role === 'student' ? year || null : null,
      interested_domain: role === 'student' ? interestedDomain || null : null,
      session_feedback: studentFeedback[0] || null,
      guidance_feedback: studentFeedback[1] || null,
      project_training_feedback: studentFeedback[2] || null,
      session_rating: ratings?.[0] || null,
      guidance_rating: ratings?.[1] || null,
      project_training_rating: ratings?.[2] || null,
      feedback_1: role !== 'student' ? feedback?.[0] || null : null,
      feedback_2: role !== 'student' ? feedback?.[1] || null : null,
      feedback_3: role !== 'student' ? feedback?.[2] || null : null,
      rating_1: role !== 'student' ? ratings?.[0] || null : null,
      rating_2: role !== 'student' ? ratings?.[1] || null : null,
      rating_3: role !== 'student' ? ratings?.[2] || null : null,
      client_service: role === 'client' ? clientService || null : null,
      intern_role: role === 'intern' ? internRole || null : null,
      intern_time: role === 'intern' ? internTime || null : null,
      feedback_about: role === 'public' ? feedbackAbout || null : null,
      nexgenads_followed: !!nexgenadsFollowed,
      onedotgrow_followed: !!onedotgrowFollowed,
      review_left: !!reviewLeft,
      metadata: {
        submitted_at: new Date().toISOString(),
        user_agent: request.headers.get('user-agent'),
        submitted_from_ip: request.headers.get('x-forwarded-for') || 'unknown',
        authenticated: !!session,
      },
    };

    const { data, error } = await supabase
      .from('feedback_submissions')
      .insert([row])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { message: 'Feedback submitted successfully!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Feedback submission error:', error);
    const message =
      error instanceof Error
        ? error.message
        : (error as { message?: string } | null)?.message;
    return NextResponse.json(
      {
        error: 'Failed to submit feedback. Please try again later.',
        details: message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}