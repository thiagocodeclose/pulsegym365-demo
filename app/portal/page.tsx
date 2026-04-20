'use client';

import { PortalHostedLinks } from '@/components/PortalHostedLinks';
import { SectionHeading } from '@/components/SectionHeading';
import { useSiteMode } from '@/components/SiteModeProvider';

export default function PortalPage() {
  const { isPulse } = useSiteMode();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Member portal</span>
          <h1>Member access, bookings, billing, and account support</h1>
          <p>
            This page is the public front door for members. Keep it clear and simple while giving fast access to the tools they need.
          </p>
          {isPulse ? <p className="portal-mode-copy">Pulse-powered mode adds connected shortcuts while keeping the same public website experience.</p> : null}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Member quick access"
            description={
              isPulse
                ? 'Connected member actions can be surfaced here without turning this page into a software dashboard.'
                : 'Standard mode keeps a clean institutional member entry point with clear navigation.'
            }
          />
          <PortalHostedLinks />
        </div>
      </section>
    </>
  );
}
