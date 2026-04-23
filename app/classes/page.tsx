'use client';

import Link from 'next/link';
import { DynamicClassesPreview } from '@/components/DynamicClassesPreview';
import { FeatureStateCard } from '@/components/FeatureStateCard';
import { ModeBadge } from '@/components/ModeBadge';
import { SectionHeading } from '@/components/SectionHeading';
import { useSiteMode } from '@/components/SiteModeProvider';
import { WidgetZone } from '@/components/WidgetZone';
import { classFilters, featuredClasses } from '@/lib/site-data';

export default function ClassesPage() {
  const { mode, isPulse } = useSiteMode();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Classes</span>
          <h1>Find the class that matches your pace and goals</h1>
          <p>
            From reformer and yoga to combat, cycling, and strength blocks, PulseGym classes are structured for real routines.
          </p>
          {isPulse ? <ModeBadge mode="pulse" text="Schedule connected" /> : null}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Class catalog"
            title={isPulse ? 'All classes — live from your system' : 'Training categories'}
            description={
              isPulse
                ? 'Every class your gym offers, directly from your CodeGym system. Images, descriptions, difficulty, and booking — always current.'
                : 'Standard mode displays a polished static class catalog built for easy discovery.'
            }
          />
          {isPulse ? <ModeBadge mode="pulse" text="Class catalog connected" /> : null}
          <div className="mt-section-sm">
            <WidgetZone widget="classes" active={isPulse} label="Live class catalog">
              <>
                <div className="filters-row">
                  {classFilters.map((item, index) => (
                    <span key={item} className={`filter-chip ${index === 0 ? 'active' : ''}`}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-section-sm">
                  <DynamicClassesPreview classes={featuredClasses} mode={mode} />
                </div>
              </>
            </WidgetZone>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Live schedule"
            title={isPulse ? 'Weekly schedule — updated in real time' : 'Popular class windows'}
            description={
              isPulse
                ? 'See available spots and book directly. Connected to your CodeGym system.'
                : 'This preview represents a static editorial section commonly used in gym websites.'
            }
          />

          <WidgetZone widget="schedule" active={isPulse} label="Live class schedule">
            <div className="schedule-board">
              <article className="schedule-card">
                <h3>Morning Momentum</h3>
                <div className="schedule-lines">
                  <span className="schedule-line">7:00 AM · Reformer Pilates</span>
                  <span className="schedule-line">8:00 AM · Strength Floor Express</span>
                  <span className="schedule-line">9:00 AM · Aqua Conditioning</span>
                </div>
              </article>
              <article className="schedule-card">
                <h3>After Work Energy</h3>
                <div className="schedule-lines">
                  <span className="schedule-line">5:30 PM · Rhythm Ride</span>
                  <span className="schedule-line">6:30 PM · Power Yoga Flow</span>
                  <span className="schedule-line">7:15 PM · Boxing Fundamentals</span>
                </div>
              </article>
              <article className="schedule-card">
                <h3>Combat Block</h3>
                <div className="schedule-lines">
                  <span className="schedule-line">6:30 PM · Boxing Conditioning</span>
                  <span className="schedule-line">8:00 PM · No-Gi Jiu Jitsu</span>
                  <span className="schedule-line">8:15 PM · Open Mat Skills</span>
                </div>
              </article>
            </div>
          </WidgetZone>
        </div>
      </section>

      {isPulse ? (
        <section className="section">
          <div className="container">
            <SectionHeading
              eyebrow="Pulse advantage"
              title="What changes when your website is connected"
              description="Standard websites show static content. Pulse-Powered websites reflect your real business — live."
            />
            <div className="feature-state-list">
              <FeatureStateCard
                label="Class catalog"
                standard="Static cards updated manually whenever classes change."
                pulse="Live catalog from your system — images, descriptions, difficulty, and availability always current."
              />
              <FeatureStateCard
                label="Schedule"
                standard="Fixed weekly grid embedded in the page code."
                pulse="Live schedule widget shows real spots, waitlist status, and booking — connected directly."
              />
              <FeatureStateCard
                label="Booking flow"
                standard="External link or phone call required."
                pulse="Book a class directly from the widget. Spots update in real time."
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="section alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <span className="eyebrow">Ready to train?</span>
              <h2>Find your class and book your first session.</h2>
              <p>From early mornings to late evenings — there is always a class that fits your schedule.</p>
            </div>
            <div className="hero-actions">
              <Link href="/free-trial" className="button button-primary">
                Start Free Trial
              </Link>
              <Link href="/pricing" className="button button-ghost">
                View Membership Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
