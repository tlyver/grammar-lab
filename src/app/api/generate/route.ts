// /app/api/generate/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { sentence } = await request.json()

    if (!sentence || typeof sentence !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing "sentence"' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: `You submitted: "${sentence}"` });
  } catch (err) {
    console.error('API error in /generate:', err);
    return NextResponse.json(
      { error: 'Internal sever error' },
      { status: 500 }
    );
  }
}
