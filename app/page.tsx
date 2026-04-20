'use client';

import Link from 'next/link';
import { ComparisonTable } from '@/components/ComparisonTable';
import { DynamicClassesPreview } from '@/components/DynamicClassesPreview';
import { DynamicPricingPreview } from '@/components/DynamicPricingPreview';
import { FeatureStateCard } from '@/components/FeatureStateCard';
import { ModeBadge } from '@/components/ModeBadge';
import { ModeAwareSection } from '@/components/ModeAwareSection';
import { SectionHeading } from '@/components/SectionHeading';
import { TrainerCard } from '@/components/TrainerCard';
import { useSiteMode } from '@/components/SiteModeProvider';
import {
  comparisonRows,
  facilities,
  featuredClasses,
  plans,
  pulseEnhancements,
  site,
  testimonials,
  trainingStyles,
  trainers
} from '@/lib/site-data';

export default function HomePage() {
  const { mode, isPulse } = useSiteMode();

  return (
    <>
      <section className="hero home-hero-v3">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="kicker">Premium community fitness club</span>
            <h1>One membership. Eight training worlds. One club to keep you moving.</h1>
            <p>
              Discover Pilates, Yoga, Aquatics, Boxing, Jiu Jitsu, Dance, Spinning, and high-performance strength training at PulseGym.
            </p>
            <div className="hero-actions">
              <Link href="/free-trial" className="button button-primary">
                Start Free Trial
              </Link>
              <Link href="/classes" className="button button-ghost">
                Explore Classes
              </Link>
            </div>
            <div className="hero-metrics">
              {site.heroStats.map((item) => (
                <div key={item.label} className="metric">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-lifestyle-panel">
            {isPulse ? <ModeBadge mode="pulse" text="Pulse-Powered website active" /> : null}
            <div className="hero-lifestyle-art">
              <div className="hero-lifestyle-overlay">
                <h3>Train with structure, variety, and real coaching.</h3>
                <p>From early-morning reformer to evening combat sessions, your week stays full of options.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section metrics-strip">
        <div className="container metrics-strip-grid">
          <article>
            <strong>8 training zones</strong>
            <span>Designed for strength, classes, and recovery in one location.</span>
          </article>
          <article>
            <strong>60+ weekly classes</strong>
            <span>Morning, midday, and evening blocks built for real schedules.</span>
          </article>
          <article>
            <strong>4.9 member rating</strong>
            <span>Community-focused coaching and premium facility standards.</span>
          </article>
          <article>
            <strong>All-in-one fitness club</strong>
            <span>Everything from first trial session to long-term performance goals.</span>
          </article>
        </div>
      </section>

      <ModeAwareSection mode={mode} className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Training styles"
            title="Choose your style. Build your week your way."
            description="PulseGym is designed for variety and consistency, so members can train hard, recover smart, and stay engaged year-round."
          />
          <div className="training-grid">
            {trainingStyles.map((style) => (
              <article key={style.name} className={`training-style-card accent-${style.accent}`}>
                <div className="training-style-visual" />
                <div className="training-style-body">
                  <h3>{style.name}</h3>
                  <p>{style.category}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ModeAwareSection>

      <ModeAwareSection mode={mode} className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured classes"
            title={isPulse ? 'Live class highlights from your connected schedule' : 'Featured classes this week'}
            description={
              isPulse
                ? 'In Pulse-Powered mode, class cards show live schedule context, open spots, and class status directly on the public website.'
                : 'In Standard mode, classes are showcased as strong static cards to support discovery and conversions.'
            }
          />
          <DynamicClassesPreview classes={featuredClasses.slice(0, 4)} mode={mode} />
        </div>
      </ModeAwareSection>

      <ModeAwareSection mode={mode} className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Membership plans"
            title={isPulse ? 'Pricing connected and ready to stay current' : 'Membership options for every training style'}
            description={
              isPulse
                ? 'Pulse-Powered mode highlights live pricing behavior while preserving the same premium gym website experience.'
                : 'Standard mode presents polished, conversion-ready pricing cards for a traditional gym website.'
            }
          />
          <DynamicPricingPreview plans={plans} mode={mode} />
        </div>
      </ModeAwareSection>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Coaches"
            title="Certified coaches across every zone"
            description="PulseGym combines premium facility standards with people-first coaching that members trust."
          />
          <div className="trainers-grid">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.name} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Facilities"
            title="Built for complete training journeys"
            description="Each space is purpose-built for a specific modality, so members always know where and how to train."
          />
          <div className="facilities-grid">
            {facilities.map((space) => (
              <article key={space.name} className={`facility-card accent-${space.accent}`}>
                <div className="facility-visual" />
                <div className="facility-body">
                  <h3>{space.name}</h3>
                  <p>{space.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Website upgrade view"
            title="Standard Website vs Pulse-Powered Website"
            description="Start with a real gym website experience. Then activate connected business blocks where they add the most value."
          />
          <ComparisonTable rows={comparisonRows} />
          <div className="feature-state-list">
            <FeatureStateCard
              label="Plans"
              standard="Pricing cards are manually updated."
              pulse="Pricing blocks are managed in Pulse and auto-updated on the website."
            />
            <FeatureStateCard
              label="Classes"
              standard="Class cards and weekly schedule are static content."
              pulse="Class previews can show live times, availability, and status."
            />
            <FeatureStateCard
              label="Trial and Questions"
              standard="Generic form and contact page workflow."
              pulse="Smart lead capture and AI-assisted answers keep conversion moving."
            />
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Member feedback"
            title="Why members stay"
            description="Strong routines are built when coaching, classes, and recovery all work together."
          />
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <blockquote>"{item.quote}"</blockquote>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <span className="eyebrow">Next step</span>
              <h2>Try PulseGym and feel the difference between static and connected experiences.</h2>
              <p>
                {isPulse
                  ? 'Pulse enhancements active: ' + pulseEnhancements.join(' · ')
                  : 'Start with the Standard Website and switch to Pulse-Powered mode any time using the website mode toggle.'}
              </p>
            </div>
            <div className="hero-actions">
              <Link href="/free-trial" className="button button-primary">
                Start Free Trial
              </Link>
              <Link href="/pricing" className="button button-ghost">
                View Membership Plans
              </Link>
              <Link href="/classes" className="button button-ghost">
                Book a Class
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
