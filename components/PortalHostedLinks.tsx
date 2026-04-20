'use client';

import Link from 'next/link';
import { useDemo } from './DemoProvider';

const CODEGYM_URL = process.env.NEXT_PUBLIC_CODEGYM_URL || 'https://codegym-bolt.vercel.app';
const GYM_SLUG = process.env.NEXT_PUBLIC_GYM_SLUG || 'pulsegym365';

const staticCards = [
  { title: 'Bookings', desc: 'Reserve classes, review spots, and manage attendance.' },
  { title: 'Membership', desc: 'See plan details, payment info, and renewal paths.' },
  { title: 'Progress', desc: 'Future space for badges, streaks, or class history.' },
  { title: 'Support', desc: 'Fast path to AI help, staff contact, or account questions.' },
];

const hostedLinks = [
  { title: 'Book a Class', desc: 'Members pick a class, choose a spot, and confirm instantly.', href: `/widgets/schedule/${GYM_SLUG}`, icon: '📅' },
  { title: 'Manage Membership', desc: 'Update card, pause, cancel, or upgrade — self-service.', href: `/portal/${GYM_SLUG}`, icon: '💳' },
  { title: 'Sign Up', desc: 'New members onboard with plan selection and Stripe checkout.', href: `/signup/${GYM_SLUG}`, icon: '🚀' },
  { title: 'AI Support', desc: 'Get instant answers from the AI coach or reach staff.', href: `/widgets/chat/${GYM_SLUG}`, icon: '🤖' },
];

export function PortalHostedLinks() {
  const { isActive } = useDemo();

  if (!isActive) {
    return (
      <>
        <div className="portal-grid">
          {staticCards.map((card) => (
            <article className="portal-card" key={card.title}>
              <strong>{card.title}</strong>
              <span>{card.desc}</span>
            </article>
          ))}
        </div>
        <div className="cta-banner" style={{ marginTop: '1.25rem' }}>
          <div>
            <span className="eyebrow">Portal CTA</span>
            <h2>In production, this button would route into the real member experience.</h2>
            <p>For now, keep the website entry simple and obvious. That alone removes friction.</p>
          </div>
          <div className="hero-actions">
            <Link href="/free-trial" className="button button-ghost">
              Back to Trial
            </Link>
            <a href="#" className="button button-primary">
              Member Login
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Active badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.4rem 0.8rem',
        background: 'rgba(142, 103, 255, 0.12)',
        border: '1px solid rgba(142, 103, 255, 0.25)',
        borderRadius: 999, marginBottom: '1rem', color: '#8e67ff',
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#8e67ff', boxShadow: '0 0 8px #8e67ff',
          display: 'inline-block',
        }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>LIVE — Hosted Pages</span>
      </div>

      <div className="portal-grid">
        {hostedLinks.map((link) => (
          <a
            key={link.title}
            href={`${CODEGYM_URL}${link.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="portal-card"
            style={{ textDecoration: 'none', cursor: 'pointer', transition: 'border-color 0.2s' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
              <strong>{link.title}</strong>
            </div>
            <span>{link.desc}</span>
            <span style={{ fontSize: '0.72rem', color: '#8e67ff', marginTop: '0.25rem' }}>
              Opens CodeGym hosted page →
            </span>
          </a>
        ))}
      </div>

      <div className="cta-banner" style={{ marginTop: '1.25rem' }}>
        <div>
          <span className="eyebrow">Hosted Pages</span>
          <h2>Zero code. Just link directly to CodeGym-hosted experiences.</h2>
          <p>Perfect for ad landing pages, email CTAs, and QR codes in the gym.</p>
        </div>
        <div className="hero-actions">
          <a href={`${CODEGYM_URL}/signup/${GYM_SLUG}`} target="_blank" rel="noopener noreferrer" className="button button-primary">
            Try Signup Page →
          </a>
        </div>
      </div>
    </>
  );
}
