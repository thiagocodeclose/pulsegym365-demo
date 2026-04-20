'use client';

import { FormEvent, useState } from 'react';

type Result = { ok: boolean; message: string } | null;

export function TrialForm() {
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

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
      smsConsent: formData.get('smsConsent') === 'on',
      waiverAccepted: formData.get('waiverAccepted') === 'on',
      source: 'pulsegym-demo-form'
    };

    const response = await fetch('/api/demo-trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { ok: boolean; message: string };
    setResult(data);
    setLoading(false);

    if (data.ok) {
      form.reset();
    }
  }

  return (
    <div className="form-shell">
      <h2>Start your free trial</h2>
      <p>
        Demo form ready to simulate the native website bridge. Later, this can post directly into Pulse for lead capture,
        attribution, AI follow-up, and member onboarding.
      </p>

      <form onSubmit={handleSubmit} className="form-grid">
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
          <select id="interest" name="interest" defaultValue="All Access">
            <option>All Access</option>
            <option>Pilates</option>
            <option>Yoga</option>
            <option>Swimming</option>
            <option>Boxing</option>
            <option>Jiu Jitsu</option>
            <option>Dance</option>
            <option>Spinning</option>
            <option>Gym Floor</option>
          </select>
        </div>
        <div className="form-row full">
          <label className="checkbox-row">
            <input type="checkbox" name="smsConsent" defaultChecked />
            <span>I agree to receive demo SMS updates about my free trial and class options.</span>
          </label>
        </div>
        <div className="form-row full">
          <label className="checkbox-row">
            <input type="checkbox" name="waiverAccepted" required />
            <span>I accept the demo liability waiver and club terms.</span>
          </label>
        </div>
        <div className="form-row full">
          <button type="submit" className="button button-primary button-block" disabled={loading}>
            {loading ? 'Submitting...' : 'Claim Free Trial'}
          </button>
        </div>
      </form>

      {result ? <div className={result.ok ? 'success-box' : 'form-note'}>{result.message}</div> : null}
    </div>
  );
}
