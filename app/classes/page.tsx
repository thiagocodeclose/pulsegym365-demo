'use client';

import Link from 'next/link';
import { DynamicClassesPreview } from '@/components/DynamicClassesPreview';
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
            title="Training categories"
            description={
              isPulse
                ? 'Pulse-Powered mode highlights class cards with live schedule context and availability.'
                : 'Standard mode displays a polished static class catalog built for easy discovery.'
            }
          />
          <div className="filters-row">
            {classFilters.map((item, index) => (
              <span key={item} className={`filter-chip ${index === 0 ? 'active' : ''}`}>
                {item}
              </span>
            ))}
          </div>

          <div className="mt-section-sm">
            <WidgetZone widget="schedule" active={isPulse} label="Live class schedule">
              <DynamicClassesPreview classes={featuredClasses} mode={mode} />
            </WidgetZone>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Weekly highlights"
            title={isPulse ? 'Live schedule preview' : 'Popular class windows'}
            description={
              isPulse
                ? 'This preview represents connected class windows with availability updates from Pulse.'
                : 'This preview represents a static editorial section commonly used in gym websites.'
            }
          />

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

          <div className="hero-actions mt-section-sm">
            <Link href="/free-trial" className="button button-primary">
              Start Free Trial
            </Link>
            <Link href="/pricing" className="button button-ghost">
              View Membership Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
