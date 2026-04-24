import { NextRequest, NextResponse } from 'next/server';

const CODEGYM_URL = process.env.NEXT_PUBLIC_CODEGYM_URL || 'https://app.codegyms.com';
const GYM_SLUG = process.env.NEXT_PUBLIC_GYM_SLUG || 'pulsegym';
const WIDGET_KEY = process.env.NEXT_PUBLIC_WIDGET_KEY || '';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    interest?: string;
    smsConsent?: boolean;
    waiverAccepted?: boolean;
    source?: string;
    // Class picker (Step 3)
    scheduleId?: string | null;
    scheduleName?: string | null;
    scheduleDate?: string | null;
    scheduleTime?: string | null;
    // Friend referral (Step 4)
    friendName?: string | null;
    friendEmail?: string | null;
  } | null;

  if (!body) {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const {
    firstName, lastName, email, phone, interest,
    smsConsent, waiverAccepted, source,
    scheduleId, scheduleName, scheduleDate, scheduleTime,
    friendName, friendEmail,
  } = body;

  if (!firstName || !lastName || !email || !phone || !waiverAccepted) {
    return NextResponse.json(
      { ok: false, message: 'Please complete all required fields before submitting the demo trial form.' },
      { status: 400 }
    );
  }

  // Build context — includes class selection if provided
  const context: Record<string, unknown> = {
    source: source || 'pulsegym-demo',
    utm_source: 'pulsegym365',
    utm_medium: 'demo_site',
    utm_campaign: 'free_trial_form',
  };

  if (scheduleId) {
    context.selected_class_id = scheduleId;
    context.selected_class_name = scheduleName ?? null;
    context.selected_class_date = scheduleDate ?? null;
    context.selected_class_time = scheduleTime ?? null;
  }

  if (friendEmail) {
    context.friend_referral = true;
    context.friend_name = friendName ?? null;
    context.friend_email = friendEmail;
  }

  try {
    // Submit the main lead
    const res = await fetch(`${CODEGYM_URL}/api/public/form-bridge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: GYM_SLUG,
        widget_key: WIDGET_KEY,
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        form_type: 'trial_pass',
        sms_consent: smsConsent ?? false,
        waiver_accepted: waiverAccepted ?? true,
        interest,
        source_url: 'https://pulsegym365.com/free-trial',
        context,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error('[demo-trial] form-bridge error:', data);
      return NextResponse.json(
        { ok: false, message: (data as { message?: string }).message || 'Failed to submit. Please try again.' },
        { status: 500 }
      );
    }

    // If a friend was referred, submit them as a separate lead with source = 'referral'
    if (friendEmail && friendEmail.includes('@')) {
      const friendFullName = friendName?.trim() || 'Friend';
      fetch(`${CODEGYM_URL}/api/public/form-bridge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: GYM_SLUG,
          widget_key: WIDGET_KEY,
          name: friendFullName,
          email: friendEmail,
          phone: null,
          form_type: 'referral',
          sms_consent: false,
          waiver_accepted: false,
          interest,
          source_url: 'https://pulsegym365.com/free-trial',
          context: {
            source: 'referral',
            referred_by_name: `${firstName} ${lastName}`.trim(),
            referred_by_email: email,
            utm_source: 'pulsegym365',
            utm_medium: 'referral',
            utm_campaign: 'friend_invite',
          },
        }),
      }).catch((err) => console.warn('[demo-trial] friend referral submit failed (non-critical):', err));
    }

    return NextResponse.json({
      ok: true,
      message: 'Your free trial request has been received! Our team will reach out shortly.',
      lead_id: (data as { lead_id?: string }).lead_id,
    });
  } catch (err) {
    console.error('[demo-trial] unexpected error:', err);
    return NextResponse.json(
      { ok: false, message: 'Unexpected error. Please try again.' },
      { status: 500 }
    );
  }
}
