import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const SESSION_COOKIE = 'nexgenads_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

type SessionPayload = {
  googleId: string;
  name: string;
  email: string;
  picture?: string;
};

const secret = (): Buffer =>
  Buffer.from(process.env.GOOGLE_CLIENT_SECRET || 'nexgenads-default-secret', 'utf8');

const sign = (payload: string): string =>
  createHmac('sha256', secret()).update(payload).digest('base64url');

export async function createSession(payload: SessionPayload): Promise<void> {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = sign(body);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, `${body}.${sig}`, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === 'production' &&
      (process.env.APP_URL || '').startsWith('https://'),
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  const dotIndex = raw.lastIndexOf('.');
  if (dotIndex <= 0) return null;

  const body = raw.slice(0, dotIndex);
  const sig = raw.slice(dotIndex + 1);

  try {
    const expected = Buffer.from(sign(body), 'utf8');
    const received = Buffer.from(sig, 'utf8');
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
      return null;
    }
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
