'use client';

import { FormEvent, useState } from 'react';
import { useDemo } from './DemoProvider';

type Result = { ok: boolean; message: string } | null;

export function TrialForm() {
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const { isActive } = useDemo();

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

    if (isActive && data.ok) {
      setResult({
        ok: true,
        message: '✅ Lead captured via Form Bridge → CodeGym pipeline activated: AI follow-up scheduled, SMS drip queued, attribution tracked (source: website, page: free-trial).'
      });
    } else {
      setResult(data);
    }

    setLoading(false);
    if (data.ok) form.reset();
  }

  return (
    <div className="form-shell">
      {isActive && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.4rem 0.8rem',
          background: 'rgba(44, 207, 114, 0.12)',
          border: '1px solid rgba(44, 207, 114, 0.25)',
          borderRadius: 999, marginBottom: '0.75rem', color: '#2ccf72',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#2ccf72', boxShadow: '0 0 8px #2ccf72',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>LIVE — Form Bridge active</span>
        </div>
      )}

      <h2>Start your free trial</h2>
      <p>
        {isActive
          ? 'This is the same website form — no changes to the HTML. The Form Bridge intercepts the submission and routes it into the CodeGym lead pipeline with AI follow-up.'
          : 'Demo form ready to simulate the native website bridge. Later, this can post directly into Pulse for lead capture, attribution, AI follow-up, and member onboarding.'
        }
      </p>

      <form
        onSubmit={handleSubmit}
        className="form-grid"
        {...(isActive ? { 'data-codegym-form': '', 'data-gym': 'pulsegym365', 'data-form-type': 'trial_pass' } : {})}
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

      {isActive && (
        <div style={{
          marginTop: '1rem', padding: '0.75rem 1rem',
          background: 'rgba(42,109,246,0.08)',
          border: '1px solid rgba(42,109,246,0.2)',
          borderRadius: 12, fontSize: '0.78rem', color: '#aaa', lineHeight: 1.6,
        }}>
          <strong style={{ color: '#2a6df6' }}>Form Bridge pipeline:</strong> Lead created → AI scores interest → SMS welcome sent → Follow-up scheduled in 24h → If no conversion in 72h, AI re-engages automatically.
        </div>
      )}
    </div>
  );
}
