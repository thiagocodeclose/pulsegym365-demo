'use client';

import Link from 'next/link';
import { FeatureStateCard } from '@/components/FeatureStateCard';
import { ModeBadge } from '@/components/ModeBadge';
import { PortalHostedLinks } from '@/components/PortalHostedLinks';
import { SectionHeading } from '@/components/SectionHeading';
import { useSiteMode } from '@/components/SiteModeProvider';
import { WidgetZone } from '@/components/WidgetZone';

export default function PortalPage() {
  const { mode, isPulse } = useSiteMode();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Member portal</span>
          <h1>
            {isPulse
              ? 'Your membership — bookings, billing, and account, all connected.'
              : 'Member access, bookings, billing, and account support'}
          </h1>
          <p>
            {isPulse
              ? 'Pulse-Powered mode connects this public entry page directly to your gym management system. Members get live access without logging into a separate app.'
              : 'This page is the public front door for members. Keep it clear and simple while giving fast access to the tools they need.'}
          </p>
          {isPulse ? <ModeBadge mode="pulse" text="Member portal connected" /> : null}
        </div>
      </section>

      {/* ── Main access block ── */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={isPulse ? 'Live member access' : 'Quick access'}
            title={
              isPulse
                ? 'Connected portal — bookings, plans, and billing live from your system'
                : 'Member quick access'
            }
            description={
              isPulse
                ? 'Pulse-Powered mode surfaces live member actions without turning this page into a software dashboard.'
                : 'Standard mode keeps a clean, institutional member entry point with clear navigation.'
            }
          />
          {/* Pulse: show the real member_portal widget; Standard: show static portal cards */}
          <WidgetZone widget="member_portal" active={isPulse} label="Live member portal">
            <PortalHostedLinks />
          </WidgetZone>
        </div>
      </section>

      {/* ── Standard vs Pulse comparison ── */}
      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Standard vs Pulse-Powered"
            title="What changes when you connect your portal"
            description="The public website page stays the same. What changes is what happens after the member clicks."
          />
          <div className="feature-state-list">
            <FeatureStateCard
              label="Member login"
              standard="Link to a generic login page. Members navigate to a separate system."
              pulse="Widget opens the member portal inline — bookings, plan, and billing without leaving the site."
            />
            <FeatureStateCard
              label="Bookings"
              standard="Members call or use a separate booking app not connected to the website."
              pulse="Live class schedule and booking available directly from the portal widget."
            />
            <FeatureStateCard
              label="Plan & billing"
              standard="Members email or call to check their plan status or make changes."
              pulse="Plan upgrades, payment history, and billing actions connected from the same page."
            />
            <FeatureStateCard
              label="Guest passes"
              standard="Manual process — reception issues passes on request."
              pulse="Members can share a digital guest pass link directly from the portal widget."
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <span className="eyebrow">Not a member yet?</span>
              <h2>
                {isPulse
                  ? 'Start with a free trial and activate full portal access on day one.'
                  : 'Try PulseGym free and see what all-in-one fitness club membership looks like.'}
              </h2>
              <p>
                {isPulse
                  ? 'Your portal, your schedule, and your progress — connected from your first visit.'
                  : 'No pressure, no contract required for the first trial experience.'}
              </p>
            </div>
            <div className="hero-actions">
              <Link href="/free-trial" className="button button-primary">Start Free Trial</Link>
              <Link href="/pricing" className="button button-ghost">View Membership Plans</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
