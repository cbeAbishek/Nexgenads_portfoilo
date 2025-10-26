import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription, interests = [], metadata = {} } = body;

    if (!subscription || typeof subscription !== 'object') {
      return NextResponse.json({ error: 'Missing subscription payload.' }, { status: 400 });
    }

    const { endpoint, expirationTime, keys } = subscription;

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json({ error: 'Invalid subscription format.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('push_subscriptions')
      .upsert(
        [
          {
            endpoint,
            expiration_time: expirationTime ?? null,
            keys,
            interests,
            metadata: {
              ...metadata,
              user_agent: request.headers.get('user-agent'),
              ip_address: request.headers.get('x-forwarded-for') || 'unknown',
            },
          },
        ],
        { onConflict: 'endpoint' }
      )
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Subscription stored', data }, { status: 200 });
  } catch (error) {
    console.error('Push subscribe error:', error);
    return NextResponse.json({ error: 'Failed to save subscription.' }, { status: 500 });
  }
}
