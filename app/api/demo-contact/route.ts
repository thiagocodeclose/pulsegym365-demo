import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    topic?: string;
    message?: string;
  };

  if (!body.name || !body.email || !body.topic || !body.message) {
    return NextResponse.json(
      { ok: false, message: 'Please complete the full contact form before sending.' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      'Demo contact message sent. In production, this would route into Pulse lead capture, communications, or support workflows.'
  });
}
