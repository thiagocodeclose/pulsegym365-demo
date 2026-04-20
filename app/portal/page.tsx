import Link from 'next/link';
import { SectionHeading } from '@/components/SectionHeading';

export default function PortalPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Member portal</span>
          <h1>A simple public entry point for members</h1>
          <p>
            This page demonstrates the website role clearly: the gym site helps members reach the portal quickly without turning the whole site into an application shell.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Portal entry options"
            description="Use this area for login, account management links, booking access, billing, or app download prompts once the real member portal is connected."
          />
          <div className="portal-grid">
            <article className="portal-card">
              <strong>Bookings</strong>
              <span>Reserve classes, review spots, and manage attendance.</span>
            </article>
            <article className="portal-card">
              <strong>Membership</strong>
              <span>See plan details, payment info, and renewal paths.</span>
            </article>
            <article className="portal-card">
              <strong>Progress</strong>
              <span>Future space for badges, streaks, or class history.</span>
            </article>
            <article className="portal-card">
              <strong>Support</strong>
              <span>Fast path to AI help, staff contact, or account questions.</span>
            </article>
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
        </div>
      </section>
    </>
  );
}
