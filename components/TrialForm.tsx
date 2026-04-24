'use client';

import Script from 'next/script';
import { FormEvent, useEffect, useState } from 'react';
import { useSiteMode } from './SiteModeProvider';
import { ModeBadge } from './ModeBadge';
import { codegym, trialInterestOptions } from '@/lib/site-data';

type ClassSlot = {
  id: string;
  name: string;
  start_time: string;
  end_time: string | null;
  scheduled_date: string;
  spots_available: number;
  instructor_name: string | null;
  program_name: string | null;
  duration_minutes: number | null;
};

type Result = { ok: boolean; message: string } | null;

const STEPS = 4;

function formatClassDate(dateStr: string) {
  // Parse as local date to avoid timezone shifts
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatTime(t: string) {
  if (!t) return '';
  const [h, min] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${String(min).padStart(2, '0')} ${ampm}`;
}

// ─── Standard mode: simple single-step form ──────────────────────────────────

function StandardForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get('firstName') || ''),
      lastName: String(fd.get('lastName') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      interest: String(fd.get('interest') || ''),
      smsConsent: fd.get('smsConsent') === 'on',
      waiverAccepted: fd.get('waiverAccepted') === 'on',
      source: 'pulsegym-demo-standard',
    };
    const res = await fetch('/api/demo-trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json() as { ok: boolean; message: string };
    setResult(data);
    setLoading(false);
    if (data.ok) (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="form-shell">
      <ModeBadge mode="standard" text="Standard Trial Form" subtle />
      <h2>Start your free trial</h2>
      <p>Simple website form for trial interest. Staff review and manual follow-up happen through regular inbox workflows.</p>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <label>First name</label>
          <input name="firstName" placeholder="Jordan" required />
        </div>
        <div className="form-row">
          <label>Last name</label>
          <input name="lastName" placeholder="Miles" required />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input name="email" type="email" placeholder="jordan@example.com" required />
        </div>
        <div className="form-row">
          <label>Phone</label>
          <input name="phone" placeholder="(801) 555-0148" required />
        </div>
        <div className="form-row full">
          <label htmlFor="standard-interest">Main interest</label>
          <select id="standard-interest" name="interest" title="Main interest" defaultValue={trialInterestOptions[0]}>
            {trialInterestOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
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
    </div>
  );
}

// ─── Pulse mode: 4-step guided form ──────────────────────────────────────────

export function TrialForm() {
  const { mode, isPulse } = useSiteMode();

  if (!isPulse) return <StandardForm />;

  return <PulseTrialForm mode={mode} />;
}

function PulseTrialForm({ mode }: { mode: string }) {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  // Step 1
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Step 2
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 3
  const [classes, setClasses] = useState<ClassSlot[]>([]);
  const [classesLoading, setClassesLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSlot | null>(null);

  // Step 4
  const [interest, setInterest] = useState(trialInterestOptions[0]);
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [smsConsent, setSmsConsent] = useState(true);
  const [waiverAccepted, setWaiverAccepted] = useState(false);

  // Fetch classes when reaching step 3
  useEffect(() => {
    if (step !== 3 || classes.length > 0) return;
    setClassesLoading(true);
    fetch(`${codegym.baseUrl}/api/public/classes?slug=${codegym.gymSlug}`)
      .then((r) => r.json())
      .then((data) => setClasses(data.classes ?? []))
      .catch(() => {})
      .finally(() => setClassesLoading(false));
  }, [step, classes.length]);

  const canStep1 = firstName.trim().length >= 2 && lastName.trim().length >= 1;
  const canStep2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && phone.trim().length >= 7;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!waiverAccepted) return;
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/demo-trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        interest,
        smsConsent,
        waiverAccepted,
        scheduleId: selectedClass?.id ?? null,
        scheduleName: selectedClass?.name ?? null,
        scheduleDate: selectedClass?.scheduled_date ?? null,
        scheduleTime: selectedClass?.start_time ?? null,
        friendName: friendName.trim() || null,
        friendEmail: friendEmail.trim() || null,
        source: `pulsegym-demo-${mode}`,
      }),
    });

    const data = await res.json() as { ok: boolean; message: string };
    setResult(
      data.ok
        ? {
            ok: true,
            message: selectedClass
              ? `You're in! Trial reserved for ${selectedClass.name} on ${formatClassDate(selectedClass.scheduled_date)}. Check your email for your portal access and class details.`
              : `Trial reserved! Check your email — your portal access and next steps are on the way.`,
          }
        : data
    );
    setLoading(false);
  }

  if (result) {
    return (
      <div className="form-shell">
        <ModeBadge mode="pulse" text="Smart Lead Capture" />
        <div className={`${result.ok ? 'success-box' : 'form-note'} trial-result`}>
          {result.ok ? '✓ ' : ''}{result.message}
        </div>
        {result.ok && (
          <div className="pulse-form-note trial-result-note">
            <strong>Pulse active:</strong> Lead attributed, AI pipeline enrolled, follow-up scheduled.
            {friendEmail && ' Your friend will receive a separate invitation.'}
          </div>
        )}
      </div>
    );
  }

  const stepTitles = [
    "Who's joining?",
    'How can we reach you?',
    'Pick your first class',
    'Almost done!',
  ];

  const stepSubtitles = [
    'Start your free trial at PulseGym.',
    "We'll send your trial confirmation and portal access here.",
    'Reserve your first class now — or skip and we will help you find one.',
    'Choose your goal and optionally invite a friend.',
  ];

  return (
    <div className="form-shell">
      <Script src={`${codegym.baseUrl}/widgets/form-bridge.js`} strategy="lazyOnload" id="codegym-form-bridge" />
      <ModeBadge mode="pulse" text="Smart Lead Capture" />

      {/* Progress bar */}
      <div className="trial-progress">
        {Array.from({ length: STEPS }, (_, i) => (
          <div
            key={i}
            className={`trial-step-bar${i + 1 <= step ? ' active' : ''}`}
          />
        ))}
        <span className="trial-step-count">{step}/{STEPS}</span>
      </div>

      <h2 className="trial-step-title">{stepTitles[step - 1]}</h2>
      <p className="trial-step-subtitle">{stepSubtitles[step - 1]}</p>

      {/* ── Step 1: Name ── */}
      {step === 1 && (
        <div className="form-grid">
          <div className="form-row">
            <label>First name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jordan"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && canStep1 && setStep(2)}
            />
          </div>
          <div className="form-row">
            <label>Last name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Miles"
              onKeyDown={(e) => e.key === 'Enter' && canStep1 && setStep(2)}
            />
          </div>
          <div className="form-row full">
            <button
              type="button"
              className="button button-primary button-block"
              onClick={() => setStep(2)}
              disabled={!canStep1}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Contact ── */}
      {step === 2 && (
        <div className="form-grid">
          <div className="form-row full">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@example.com"
              autoFocus
            />
          </div>
          <div className="form-row full">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(801) 555-0148"
            />
          </div>
          <div className="form-row">
            <button type="button" className="button button-ghost" onClick={() => setStep(1)}>
              ← Back
            </button>
          </div>
          <div className="form-row">
            <button
              type="button"
              className="button button-primary trial-btn-full"
              onClick={() => setStep(3)}
              disabled={!canStep2}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Class picker ── */}
      {step === 3 && (
        <div>
          {classesLoading ? (
            <p className="trial-loading-msg">Loading upcoming classes…</p>
          ) : classes.length === 0 ? (
            <p className="trial-no-classes">No upcoming classes in the next 14 days. You can skip this step.</p>
          ) : (
            <div className="trial-class-list">
              {classes.map((cls) => {
                const isSelected = selectedClass?.id === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    className={`trial-class-card${isSelected ? ' selected' : ''}`}
                    onClick={() => setSelectedClass(isSelected ? null : cls)}
                  >
                    <div className="trial-class-header">
                      <span className="trial-class-name">{cls.name}</span>
                      {cls.spots_available <= 5 && (
                        <span className="trial-class-spots">{cls.spots_available} left</span>
                      )}
                    </div>
                    <span className="trial-class-time">
                      {formatClassDate(cls.scheduled_date)} ·{' '}
                      {formatTime(cls.start_time)}
                      {cls.end_time ? ` – ${formatTime(cls.end_time)}` : ''}
                      {cls.duration_minutes ? ` (${cls.duration_minutes}min)` : ''}
                    </span>
                    {cls.instructor_name && (
                      <span className="trial-class-instructor">with {cls.instructor_name}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="trial-step-nav">
            <button type="button" className="button button-ghost" onClick={() => setStep(2)}>
              ← Back
            </button>
            <button type="button" className="button button-primary" onClick={() => setStep(4)}>
              {selectedClass ? 'Class picked →' : 'Skip for now →'}
            </button>
          </div>
        </div>
      )}

      {/* ── Step 4: Goals + friend + consent + submit ── */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row full">
            <label htmlFor="trial-interest">Main interest</label>
            <select
              id="trial-interest"
              title="Main interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              {trialInterestOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          {/* Friend referral */}
          <div className="form-row full trial-divider">
            <label className="trial-friend-label">
              Bring a friend? <span>(optional)</span>
            </label>
          </div>
          <div className="form-row">
            <label>Friend&apos;s name</label>
            <input
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="Alex"
            />
          </div>
          <div className="form-row">
            <label>Friend&apos;s email</label>
            <input
              type="email"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              placeholder="alex@example.com"
            />
          </div>

          {/* Consent */}
          <div className="form-row full trial-divider">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
              />
              <span>I agree to receive trial updates and class reminders.</span>
            </label>
          </div>
          <div className="form-row full">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={waiverAccepted}
                onChange={(e) => setWaiverAccepted(e.target.checked)}
                required
              />
              <span>I accept the trial participation and club terms.</span>
            </label>
          </div>

          {/* Selected class summary */}
          {selectedClass && (
            <div className="form-row full trial-class-summary">
              <span>
                ✓ First class: <strong>{selectedClass.name}</strong> ·{' '}
                {formatClassDate(selectedClass.scheduled_date)} at {formatTime(selectedClass.start_time)}
              </span>
            </div>
          )}

          <div className="form-row">
            <button type="button" className="button button-ghost" onClick={() => setStep(3)}>
              ← Back
            </button>
          </div>
          <div className="form-row">
            <button
              type="submit"
              className="button button-primary trial-btn-full"
              disabled={loading || !waiverAccepted}
            >
              {loading ? 'Claiming…' : 'Claim Free Trial →'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
