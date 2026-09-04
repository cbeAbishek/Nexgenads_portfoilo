import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { getSession } from '@/lib/auth';

const getAdminEmails = (): string[] =>
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

type FeedbackRow = Record<string, unknown> & {
  id: string;
  full_name?: string;
  email?: string;
  role?: string;
  status?: string;
  created_at?: string;
};

type CareerRow = Record<string, unknown> & {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  job_title?: string;
  status?: string;
  applied_at?: string;
};

const countBy = (rows: FeedbackRow[], key: 'role' | 'status') => {
  const counts: Record<string, number> = {};
  for (const row of rows) {
    const value = String(row[key] || 'unknown');
    counts[value] = (counts[value] || 0) + 1;
  }
  return counts;
};

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.email) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const admins = getAdminEmails();
    if (admins.length === 0) {
      return NextResponse.json(
        {
          error:
            ' ',
          code: 'NOT_CONFIGURED',
        },
        { status: 403 }
      );
    }

    if (!admins.includes(session.email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Forbidden', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const limit = 1000;

    const feedbackQuery = supabase
      .from('feedback_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    const careerQuery = supabase
      .from('job_applications')
      .select('*')
      .order('applied_at', { ascending: false })
      .limit(limit);

    const [feedbackResult, careerResult] = await Promise.allSettled([
      feedbackQuery,
      careerQuery,
    ]);

    const missingTables: string[] = [];

    const feedbackRows: FeedbackRow[] = [];
    const careerRows: CareerRow[] = [];

    if (feedbackResult.status === 'fulfilled') {
      if (feedbackResult.value.error) {
        throw feedbackResult.value.error;
      }
      feedbackRows.push(...((feedbackResult.value.data || []) as FeedbackRow[]));
    } else {
      const reason = feedbackResult.reason as { code?: string } | undefined;
      if (reason?.code === 'PGRST205') {
        missingTables.push('feedback_submissions');
      } else {
        throw feedbackResult.reason;
      }
    }

    if (careerResult.status === 'fulfilled') {
      if (careerResult.value.error) {
        throw careerResult.value.error;
      }
      careerRows.push(...((careerResult.value.data || []) as CareerRow[]));
    } else {
      const reason = careerResult.reason as { code?: string } | undefined;
      if (reason?.code === 'PGRST205') {
        missingTables.push('job_applications');
      } else {
        throw careerResult.reason;
      }
    }

    const feedbackStatus: Record<string, number> = {};
    const careerStatus: Record<string, number> = {};
    const careerJobs: Record<string, number> = {};

    for (const row of feedbackRows) {
      const status = String(row.status || 'new');
      feedbackStatus[status] = (feedbackStatus[status] || 0) + 1;
    }

    for (const row of careerRows) {
      const status = String(row.status || 'new');
      careerStatus[status] = (careerStatus[status] || 0) + 1;
      const job = String(row.job_title || 'Unknown role');
      careerJobs[job] = (careerJobs[job] || 0) + 1;
    }

    return NextResponse.json(
      {
        user: {
          name: session.name,
          email: session.email,
          picture: session.picture || null,
        },
        setup: { missingTables },
        feedback: {
          total: feedbackRows.length,
          byRole: countBy(feedbackRows, 'role'),
          byStatus: feedbackStatus,
          rows: feedbackRows,
        },
        career: {
          total: careerRows.length,
          byStatus: careerStatus,
          byJob: careerJobs,
          rows: careerRows,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin data fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to load admin data' },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}