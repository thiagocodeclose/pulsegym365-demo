"use client";

import { ComparisonTable } from '@/components/ComparisonTable';
import { FeatureStateCard } from '@/components/FeatureStateCard';
import { ModeBadge } from '@/components/ModeBadge';
import { SectionHeading } from '@/components/SectionHeading';
import { TrialForm } from '@/components/TrialForm';
import { useSiteMode } from '@/components/SiteModeProvider';
import { comparisonRows } from '@/lib/site-data';

export default function FreeTrialPage() {
  const { isPulse } = useSiteMode();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Free trial</span>
          <h1>Start strong with a no-pressure trial experience</h1>
          <p>Tell us your goals and schedule. We will match you with classes and coaching paths that fit your routine.</p>
          {isPulse ? <ModeBadge mode="pulse" text="Trial form connected to Pulse" /> : null}
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <TrialForm />
          <div className="contact-card">
            <SectionHeading
              eyebrow="What to expect"
              title="Your first visit at PulseGym"
              description="Every trial starts with a quick orientation so you can train with confidence from day one."
            />
            <div className="schedule-lines">
              <span className="schedule-line">Tour of all 8 training zones</span>
              <span className="schedule-line">Coach recommendation based on your goal</span>
              <span className="schedule-line">Class booking support for your first week</span>
              <span className="schedule-line">Plan guidance with no pressure</span>
            </div>
            {isPulse ? (
              <div className="form-note mt-section-sm">
                <strong>Pulse-Powered:</strong> Lead attribution, smart routing, and automation-ready follow-up stay connected behind the same public form.
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Experience comparison"
            title="Standard form vs smart lead capture"
            description="The website keeps the same friendly public journey while Pulse-Powered mode upgrades what happens after submit."
          />
          <div className="feature-state-list">
            <FeatureStateCard
              label="Form behavior"
              standard="Basic fields and manual inbox follow-up."
              pulse="Context-aware fields and routing-ready lead handoff."
            />
            <FeatureStateCard
              label="Attribution"
              standard="Limited source tracking."
              pulse="Lead source and trial context captured automatically."
            />
            <FeatureStateCard
              label="Follow-up"
              standard="Manual calls and emails."
              pulse="Automation-ready follow-up sequence from the same form submission."
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ComparisonTable rows={comparisonRows.slice(2, 4)} />
        </div>
      </section>
    </>
  );
}
