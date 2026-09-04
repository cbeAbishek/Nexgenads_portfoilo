import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any', {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Unable to fetch a joke right now.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Joke fetch error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch a joke right now.' },
      { status: 502 }
    );
  }
}