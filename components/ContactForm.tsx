'use client';

import { FormEvent, useState } from 'react';

type Result = { ok: boolean; message: string } | null;

export function ContactForm() {
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch('/api/demo-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        topic: String(formData.get('topic') || ''),
        message: String(formData.get('message') || '')
      })
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
      <h2>Talk to the club</h2>
      <p>Ask about plans, class recommendations, schedules, or your first trial session.</p>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" placeholder="Alex Turner" required />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="alex@example.com" required />
        </div>
        <div className="form-row full">
          <label htmlFor="topic">Topic</label>
          <select id="topic" name="topic" defaultValue="Membership">
            <option>Membership</option>
            <option>Classes</option>
            <option>Personal Training</option>
            <option>Corporate Wellness</option>
            <option>General Question</option>
          </select>
        </div>
        <div className="form-row full">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Tell us what you want to know." required />
        </div>
        <div className="form-row full">
          <button className="button button-primary button-block" disabled={loading} type="submit">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
      {result ? <div className={result.ok ? 'success-box' : 'form-note'}>{result.message}</div> : null}
    </div>
  );
}
