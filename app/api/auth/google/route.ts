import { NextRequest, NextResponse } from 'next/server';

const SCOPES = [
  'openid',
  'email',
  'profile',
].join(' ');

const safeReturnTo = (value: string | null): string => {
  if (value && value.startsWith('/') && !value.startsWith('//')) {
    return value;
  }
  return '/feedback';
};

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID.' },
      { status: 500 }
    );
  }

  const redirectUri =
    process.env.GOOGLE_CALLBACK_URL ||
    `${process.env.APP_URL || 'http://localhost:8000'}/api/auth/callback`;

  const returnTo = safeReturnTo(request.nextUrl.searchParams.get('returnTo'));
  const state = Buffer.from(`nexgenads:${returnTo}`).toString('base64url');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'online',
    include_granted_scopes: 'true',
    prompt: 'select_account',
    state,
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}