import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    waiverAccepted?: boolean;
  };

  if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.waiverAccepted) {
    return NextResponse.json(
      { ok: false, message: 'Please complete all required fields before submitting the demo trial form.' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      'Demo trial submitted successfully. In the real Pulse flow, this is where the lead would be created, attributed, and routed for AI follow-up.'
  });
}
