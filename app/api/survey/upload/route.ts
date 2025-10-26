import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { supabase } from '@/lib/supabase/client';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg', 'audio/mp4'],
} as const;
const normalizeMimeType = (mime: string) => mime.split(';')[0]?.trim().toLowerCase();

type UploadType = keyof typeof ALLOWED_TYPES;

type UploadResult = {
  path: string;
  publicUrl: string;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const typeParam = formData.get('type');

    const allowedTypes: UploadType[] = ['image', 'audio'];
    const type: UploadType =
      typeof typeParam === 'string' && allowedTypes.includes(typeParam as UploadType)
        ? (typeParam as UploadType)
        : 'image';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file upload.' }, { status: 400 });
    }

    const normalizedMimeType = normalizeMimeType(file.type);

    if (!normalizedMimeType) {
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES[type].some((mime) => mime === normalizedMimeType)) {
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File exceeds 5 MB size limit.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  const extension = getExtension(file, type, normalizedMimeType);
    const filePath = `${type}/${new Date().toISOString().split('T')[0]}-${randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage.from('survey').upload(filePath, buffer, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json({ error: 'Unable to save file to storage.' }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('survey').getPublicUrl(filePath);

    const result: UploadResult = {
      path: filePath,
      publicUrl,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Survey upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file. Please try again.' }, { status: 500 });
  }
}

function getExtension(file: File, type: UploadType, normalizedMimeType?: string): string {
  const nameParts = file.name.split('.');
  if (nameParts.length > 1) {
    return nameParts.pop()!.toLowerCase();
  }

  const mime = normalizedMimeType ?? normalizeMimeType(file.type);

  if (type === 'audio') {
    if (mime === 'audio/mpeg') return 'mp3';
    if (mime === 'audio/wav') return 'wav';
    if (mime === 'audio/ogg') return 'ogg';
    if (mime === 'audio/webm') return 'webm';
    return 'mp3';
  }

  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  if (mime === 'image/gif') return 'gif';
  return 'jpg';
}
