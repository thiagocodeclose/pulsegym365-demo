'use client';

import Link from 'next/link';
import { ComparisonTable } from '@/components/ComparisonTable';
import { DynamicClassesPreview } from '@/components/DynamicClassesPreview';
import { DynamicPricingPreview } from '@/components/DynamicPricingPreview';
import { FeatureStateCard } from '@/components/FeatureStateCard';
import { ModeAwareSection } from '@/components/ModeAwareSection';
import { SectionHeading } from '@/components/SectionHeading';
import { StatCounter } from '@/components/StatCounter';
import { TrainerCard } from '@/components/TrainerCard';
import { useSiteMode } from '@/components/SiteModeProvider';
import { WidgetZone } from '@/components/WidgetZone';
import {
  comparisonRows,
  facilities,
  featuredClasses,
  gymStats,
  partners,
  plans,
  pulseEnhancements,
  site,
  testimonials,
  trainingStyles,
  trainers,
  transformations,
} from '@/lib/site-data';

function LiveBadge() {
  return (
    <span className="live-badge" aria-label="Live data connected">
      <span className="live-dot" aria-hidden="true" />
      Live
    </span>
  );
}

const scheduleWindows = [
  {
    label: 'Morning',
    time: '5:30 – 9:00 AM',
    classes: ['Strength Express', 'Reformer Pilates', 'Power Yoga', 'Aqua Conditioning'],
  },
  {
    label: 'Midday',
    time: '12:00 – 1:30 PM',
    classes: ['Strength Floor Express', 'Aqua Conditioning'],
  },
  {
    label: 'Evening',
    time: '5:30 – 9:00 PM',
    classes: ['Rhythm Ride', 'Boxing', 'Jiu Jitsu', 'Dance Cardio', 'Power Yoga'],
  },
];

const scheduleHighlights = [
  { day: 'Mon · Wed · Fri', time: '7:00 AM', name: 'Reformer Pilates', level: 'All Levels', duration: '50 min', capacity: 12 },
  { day: 'Daily', time: '12:15 PM', name: 'Strength Floor Express', level: 'All Levels', duration: '30 min', capacity: 20 },
  { day: 'Tue · Thu', time: '7:15 PM', name: 'Boxing Fundamentals', level: 'Beginner', duration: '60 min', capacity: 16 },
];

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

          <WidgetZone widget="hero" active={isPulse} label="Live hero panel">
            {/* Static fallback — Standard mode */}
            <div className="hero-lifestyle-panel">
              <div className="hero-lifestyle-art">
                <div className="hero-lifestyle-overlay">
                  <h3>Train with structure, variety, and real coaching.</h3>
                  <p>From early-morning reformer to evening combat sessions, your week stays full of options.</p>
                </div>
              </div>
            </div>
          </WidgetZone>
        </div>
      </section>

      <section className="section metrics-strip">
        <div className="container metrics-strip-grid">
          {gymStats.map((stat) => (
            <article key={stat.label}>
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </article>
          ))}
        </div>
      </section>

      {/* ── Promo Banners widget ── */}
      <ModeAwareSection mode={mode} className="section-flush">
        <WidgetZone widget="promo_banners" active={isPulse} label="Live promotional banners">
          {/* Static fallback banners */}
          <div className="promo-banners-static">
            <div className="promo-banner-slide promo-banner-slide--default">
              <div className="promo-banner-text">
                <h2>SUMMER CHALLENGE</h2>
                <p>3 months for the price of 2 — limited spots</p>
                <a href="/sign-up" className="promo-banner-cta">Join Now</a>
              </div>
            </div>
          </div>
        </WidgetZone>
      </ModeAwareSection>

      <div className="partners-bar">
        <div className="container promo-banner-inner">
          <span className="partners-label">Certified &amp; partnered with</span>
          {partners.map((p) => (
            <div key={p.name} className="partner-chip">
              {p.name}
              <span className="partner-chip-sub">{p.category}</span>
            </div>
          ))}
        </div>
      </div>

      <ModeAwareSection mode={mode} className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Training styles"
            title={isPulse ? 'All training programs — live from your system' : 'Choose your style. Build your week your way.'}
            description={isPulse ? 'Every training modality your gym offers, connected directly to your CodeGym system.' : 'PulseGym is designed for variety and consistency, so members can train hard, recover smart, and stay engaged year-round.'}
          />
          {isPulse && <LiveBadge />}
          <WidgetZone widget="programs" active={isPulse} label="Live training programs">
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
          </WidgetZone>
        </div>
      </ModeAwareSection>

      <ModeAwareSection mode={mode} className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured classes"
            title={isPulse ? 'Live class highlights from your connected schedule' : 'Featured classes this week'}
            description={
              isPulse
                ? 'Class cards show live schedule context, open spots, and availability — connected directly to your CodeGym system.'
                : 'In Standard mode, classes are showcased as strong static cards to support discovery and conversions.'
            }
          />
          {isPulse && <LiveBadge />}
          <WidgetZone widget="classes" active={isPulse} label="Live featured classes">
            <DynamicClassesPreview classes={featuredClasses.slice(0, 4)} mode={mode} />
          </WidgetZone>
        </div>
      </ModeAwareSection>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow={isPulse ? 'Class catalog' : 'Training schedule'}
            title={isPulse ? 'All classes — live from your system' : 'Classes running every day of the week'}
            description={isPulse ? 'Every class your gym offers with images, difficulty, duration, and booking — always current from your system.' : 'Morning workouts, midday express sessions, and evening training blocks — structured for every schedule and goal.'}
          />
          {isPulse && <LiveBadge />}
          <WidgetZone widget="classes" active={isPulse} label="Live class catalog">
            <div className="schedule-windows">
              {scheduleWindows.map((w) => (
                <div key={w.label} className="schedule-window-card">
                  <div className="schedule-window-label">{w.label}</div>
                  <div className="schedule-window-time">{w.time}</div>
                  <div className="schedule-window-classes">
                    {w.classes.map((c) => (
                      <span key={c} className="schedule-window-chip">{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </WidgetZone>
          <div className="schedule-cta">
            <Link href="/classes" className="button button-ghost">
              {isPulse ? 'Browse live class catalog' : 'View full class schedule'} &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Class schedule"
            title={isPulse ? 'Live schedule — updated in real time' : 'Popular sessions this week'}
            description={isPulse ? 'Connected to your CodeGym system. Classes, times, and availability update automatically.' : 'A look at some of the most popular recurring sessions at PulseGym.'}
          />
          {isPulse && <LiveBadge />}
          <WidgetZone widget="schedule" active={isPulse} label="Live class schedule">
            <div className="schedule-highlights">
              {scheduleHighlights.map((s) => (
                <article key={s.name} className="schedule-highlight-card">
                  <div className="schedule-highlight-day">{s.day}</div>
                  <div className="schedule-highlight-time">{s.time}</div>
                  <div className="schedule-highlight-name">{s.name}</div>
                  <div className="schedule-highlight-meta">
                    <span className="schedule-highlight-chip">{s.level}</span>
                    <span className="schedule-highlight-chip">{s.duration}</span>
                    <span className="schedule-highlight-chip">{s.capacity} spots</span>
                  </div>
                </article>
              ))}
            </div>
          </WidgetZone>
          <div className="schedule-cta">
            <Link href="/classes" className="button button-ghost">Book a class &rarr;</Link>
          </div>
        </div>
      </section>

      <ModeAwareSection mode={mode} className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Membership plans"
            title={isPulse ? 'Pricing connected and ready to stay current' : 'Membership options for every training style'}
            description={
              isPulse
                ? 'Pulse-Powered mode shows live pricing directly from your system — no manual updates needed.'
                : 'Standard mode presents polished, conversion-ready pricing cards for a traditional gym website.'
            }
          />
          <WidgetZone widget="pricing" active={isPulse} label="Live membership pricing">
            <DynamicPricingPreview plans={plans} mode={mode} />
          </WidgetZone>
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
          <WidgetZone widget="reviews" active={isPulse} label="Live member reviews">
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <article key={item.name} className="testimonial-card">
                  <div className="testimonial-stars" aria-label={`${item.stars} out of 5 stars`}>
                    {'\u2605'.repeat(item.stars)}
                  </div>
                  <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </article>
              ))}
            </div>
          </WidgetZone>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Member results"
            title="Real members. Real transformations."
            description="PulseGym members achieve lasting results through coaching structure, class variety, and community accountability."
          />
          <div className="transformation-grid">
            {transformations.map((item) => (
              <article key={item.name} className={`transformation-card accent-${item.accent}`}>
                <div className="transformation-result">{item.result}</div>
                <div className="transformation-meta">
                  <strong>{item.name}</strong>
                  <span>{item.timeframe} &middot; {item.plan}</span>
                </div>
                <p>{item.story}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Find us"
            title="Built in Utah. Easy to reach. Hard to leave."
            description="Central location with covered parking, bike storage, and direct transit access."
          />
          <WidgetZone widget="info" active={isPulse} label="Live studio info">
            <div className="location-grid">
              <div className="location-map-art">
                <div className="location-map-inner">
                  <span className="location-address-big">{site.addressLine1}</span>
                  <span className="location-address-sub">{site.addressLine2}</span>
                </div>
              </div>
              <div className="location-details">
                <div className="location-detail-item">
                  <strong>Address</strong>
                  <p>{site.address}</p>
                </div>
                <div className="location-detail-item">
                  <strong>Parking</strong>
                  <p>Free covered parking for 150+ vehicles. Overflow surface lot adjacent to the building.</p>
                </div>
                <div className="location-detail-item">
                  <strong>Transit</strong>
                  <p>2 minutes from Lehi TRAX station. Bike lanes on Garibaldi Way with secure bike storage at entry.</p>
                </div>
                <div className="location-detail-item">
                  <strong>Accessibility</strong>
                  <p>ADA-compliant entry, elevators, and accessible locker rooms across all floors.</p>
                </div>
                <div className="location-actions">
                  <Link href="/contact" className="button button-ghost">Get directions &rarr;</Link>
                </div>
              </div>
            </div>
          </WidgetZone>
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
