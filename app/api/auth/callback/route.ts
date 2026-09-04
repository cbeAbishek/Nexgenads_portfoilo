import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo';

const getOAuthConfig = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL ||
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/api/auth/callback`;

  if (!clientId || !clientSecret) {
    return null;
  }
  return { clientId, clientSecret, redirectUri };
};

export async function GET(request: NextRequest) {
  const config = getOAuthConfig();
  const homeUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000';
  const feedbackUrl = `${homeUrl}/feedback`;

  if (!config) {
    return NextResponse.redirect(
      `${feedbackUrl}?error=oauth_not_configured`
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(`${feedbackUrl}?error=auth_failed`);
  }

  try {
    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Google token exchange failed:', tokenData);
      return NextResponse.redirect(`${feedbackUrl}?error=token_exchange_failed`);
    }

    const userInfoRes = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userInfo = await userInfoRes.json();
    if (!userInfoRes.ok || !userInfo.email) {
      console.error('Google userinfo failed:', userInfo);
      return NextResponse.redirect(`${feedbackUrl}?error=userinfo_failed`);
    }

    await createSession({
      googleId: userInfo.sub,
      name: userInfo.name || userInfo.email.split('@')[0],
      email: userInfo.email,
      picture: userInfo.picture,
    });

    const returnTo = searchParams.get('returnTo');
    const destination = returnTo?.startsWith('/') ? `${homeUrl}${returnTo}` : feedbackUrl;
    return NextResponse.redirect(`${destination}?auth=success`);
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return NextResponse.redirect(`${feedbackUrl}?error=unexpected`);
  }
}