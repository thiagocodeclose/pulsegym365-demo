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
          <h1>
            {isPulse
              ? 'Claim your free trial — and get matched in minutes.'
              : 'Start strong with a no-pressure trial experience'}
          </h1>
          <p>
            {isPulse
              ? 'Your details go directly into the Pulse pipeline. Coach recommendation, class booking, and follow-up happen automatically.'
              : 'Tell us your goals and schedule. We will match you with classes and coaching paths that fit your routine.'}
          </p>
          {isPulse ? <ModeBadge mode="pulse" text="Trial form connected to Pulse" /> : null}
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <TrialForm />
          <div className="contact-card">
            {isPulse ? (
              <>
                <ModeBadge mode="pulse" text="Pulse-Powered trial flow" />
                <SectionHeading
                  eyebrow="What happens next"
                  title="Connected from the moment you submit"
                  description="Your trial entry is routed through the Pulse system the instant you hit submit."
                />
                <div className="schedule-lines">
                  <span className="schedule-line">Lead captured and attributed to source automatically</span>
                  <span className="schedule-line">AI pipeline assigns coach and class recommendation</span>
                  <span className="schedule-line">Follow-up sequence starts within minutes</span>
                  <span className="schedule-line">Class reservation held if you pick a slot</span>
                  <span className="schedule-line">Portal access sent to your email on confirmation</span>
                </div>
                <div className="form-note mt-section-sm">
                  <strong>No manual steps required.</strong> Attribution, routing, and first-contact automation are handled by Pulse behind the same public form your visitors already trust.
                </div>
              </>
            ) : (
              <>
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
                <div className="form-note mt-section-sm">
                  Staff review form submissions and follow up within 24 hours by phone or email.
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Standard vs Pulse-Powered"
            title="Same form. Very different outcomes."
            description="The visitor sees the same friendly trial form in both modes. What changes is everything that happens after they hit submit."
          />
          <div className="feature-state-list">
            <FeatureStateCard
              label="Form behavior"
              standard="Basic fields, generic confirmation email, manual inbox review by staff."
              pulse="Smart multi-step form. Context-aware fields. Lead enters automation pipeline instantly."
            />
            <FeatureStateCard
              label="Lead attribution"
              standard="No source tracking. Staff note the channel manually if they remember."
              pulse="Source, page, UTM, and session context captured automatically with the lead record."
            />
            <FeatureStateCard
              label="Follow-up speed"
              standard="Staff reply within 24–48 hours by email or a phone call."
              pulse="AI pipeline starts follow-up within minutes. Coach assignment and class recommendation happen automatically."
            />
            <FeatureStateCard
              label="Class booking"
              standard="Trial visitor must call or visit to book their first class."
              pulse="Visitor picks a real upcoming class slot during the form — reservation held immediately."
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
