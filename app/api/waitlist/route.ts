import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      fullName,
      userType,
      district,
      phone,
      businessName,
      message,
      source = 'waitlist_form',
      coordinates,
    } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

  const metadata: Record<string, unknown> = {
      source,
      user_agent: request.headers.get('user-agent'),
      submitted_from_ip: request.headers.get('x-forwarded-for') || 'unknown',
    };

    if (phone) metadata.phone = phone;
    if (businessName) metadata.business_name = businessName;
    if (message) metadata.message = message;
    if (
      coordinates &&
      typeof coordinates.latitude === 'number' &&
      typeof coordinates.longitude === 'number'
    ) {
      metadata.coordinates = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      };
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          full_name: fullName,
          user_type: userType,
          location: district,
          metadata,
        },
      ])
      .select();

    if (error) {
      if ((error as { code?: string })?.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered in waitlist' },
          { status: 409 }
        );
      }

      throw error;
    }

    return NextResponse.json(
      { message: 'Successfully joined the waitlist!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit waitlist. Please try again later.' },
      { status: 500 }
    );
  }
}
