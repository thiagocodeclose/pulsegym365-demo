'use client';

import Script from 'next/script';
import { FormEvent, useMemo, useState } from 'react';
import { useSiteMode } from './SiteModeProvider';
import { ModeBadge } from './ModeBadge';
import { trialInterestOptions } from '@/lib/site-data';

const baseUrl =
  process.env.NEXT_PUBLIC_CODEGYM_URL || 'https://codegym-bolt.vercel.app';
const gymSlug = process.env.NEXT_PUBLIC_GYM_SLUG || 'pulsegym365';

type Result = { ok: boolean; message: string } | null;

export function TrialForm() {
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const { mode, isPulse } = useSiteMode();

  const helperText = useMemo(
    () =>
      isPulse
        ? 'This trial form is connected to Pulse for lead attribution, smart routing, and automation-ready follow-up.'
        : 'Simple website form for trial interest. Staff review and manual follow-up happen through regular inbox workflows.',
    [isPulse]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get('firstName') || ''),
      lastName: String(formData.get('lastName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      interest: String(formData.get('interest') || ''),
      preferredTime: String(formData.get('preferredTime') || ''),
      trainingGoal: String(formData.get('trainingGoal') || ''),
      smsConsent: formData.get('smsConsent') === 'on',
      waiverAccepted: formData.get('waiverAccepted') === 'on',
      source: `pulsegym-demo-${mode}`
    };

    const response = await fetch('/api/demo-trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { ok: boolean; message: string };

    if (isPulse && data.ok) {
      setResult({
        ok: true,
        message:
          'Lead captured with Pulse context: source attribution active, smart routing ready, and automated follow-up path prepared.'
      });
    } else {
      setResult(data);
    }

    setLoading(false);
    if (data.ok) form.reset();
  }

  return (
    <div className="form-shell">
      {isPulse ? <Script src={`${baseUrl}/widgets/form-bridge.js`} strategy="lazyOnload" id="codegym-form-bridge" /> : null}
      {isPulse ? <ModeBadge mode="pulse" text="Smart Lead Capture" /> : <ModeBadge mode="standard" text="Standard Trial Form" subtle />}
      <h2>Start your free trial</h2>
      <p>{helperText}</p>

      <form
        onSubmit={handleSubmit}
        className="form-grid"
        {...(isPulse ? {
          'data-codegym-form': '',
          'data-gym': gymSlug,
          'data-form-type': 'trial_pass',
          'data-success-url': '/free-trial',
        } : {})}
      >
        <div className="form-row">
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" placeholder="Jordan" required />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" placeholder="Miles" required />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="jordan@example.com" required />
        </div>
        <div className="form-row">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" placeholder="(801) 555-0148" required />
        </div>
        <div className="form-row full">
          <label htmlFor="interest">Main interest</label>
          <select id="interest" name="interest" defaultValue={trialInterestOptions[0]}>
            {trialInterestOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {isPulse ? (
          <>
            <div className="form-row">
              <label htmlFor="preferredTime">Preferred training time</label>
              <select id="preferredTime" name="preferredTime" defaultValue="Early Morning">
                <option>Early Morning</option>
                <option>Midday</option>
                <option>Evening</option>
                <option>Weekend</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="trainingGoal">Primary goal</label>
              <select id="trainingGoal" name="trainingGoal" defaultValue="General Fitness">
                <option>General Fitness</option>
                <option>Weight Loss</option>
                <option>Strength and Performance</option>
                <option>Mobility and Recovery</option>
              </select>
            </div>
          </>
        ) : null}

        <div className="form-row full">
          <label className="checkbox-row">
            <input type="checkbox" name="smsConsent" defaultChecked />
            <span>I agree to receive trial updates and class reminders.</span>
          </label>
        </div>
        <div className="form-row full">
          <label className="checkbox-row">
            <input type="checkbox" name="waiverAccepted" required />
            <span>I accept the trial participation and club terms.</span>
          </label>
        </div>
        <div className="form-row full">
          <button type="submit" className="button button-primary button-block" disabled={loading}>
            {loading ? 'Submitting...' : 'Claim Free Trial'}
          </button>
        </div>
      </form>

      {result ? <div className={result.ok ? 'success-box' : 'form-note'}>{result.message}</div> : null}

      {isPulse ? (
        <div className="pulse-form-note">
          <strong>Pulse connected:</strong> Lead attribution, smart routing, and automation-ready follow-up are active in this view.
        </div>
      ) : null}
    </div>
  );
}
