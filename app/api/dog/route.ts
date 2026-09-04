import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random', {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Unable to fetch a dog picture right now.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Dog image fetch error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch a dog picture right now.' },
      { status: 502 }
    );
  }
}