import { NextResponse } from 'next/server';

const SCOPES = [
  'openid',
  'email',
  'profile',
].join(' ');

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID.' },
      { status: 500 }
    );
  }

  const redirectUri =
    process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL ||
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/api/auth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'online',
    include_granted_scopes: 'true',
    prompt: 'select_account',
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}