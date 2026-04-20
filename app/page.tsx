import Link from 'next/link';
import { ClassCard } from '@/components/ClassCard';
import { IntegrationCard } from '@/components/IntegrationCard';
import { PlanCard } from '@/components/PlanCard';
import { SectionHeading } from '@/components/SectionHeading';
import { TrainerCard } from '@/components/TrainerCard';
import { featuredClasses, integrationModes, plans, site, spaces, testimonials, trainers } from '@/lib/site-data';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="kicker">Pulse-ready demo gym website</span>
            <h1>{site.tagline}</h1>
            <p>{site.subtitle}</p>
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

          <div className="hero-panel">
            <div className="hero-screen">
              <div className="hero-screen-top">
                <span className="screen-pill">PulseGym · Live demo</span>
                <span className="screen-pill">Leads + trial + portal</span>
              </div>

              <div className="hero-stack">
                <div className="panel-card">
                  <h3>Dynamic business blocks</h3>
                  <p>Pricing, classes, AI chat, trial capture, and member access can all plug into the client website.</p>
                </div>
                <div className="panel-grid">
                  <div className="panel-card">
                    <h3>Classes</h3>
                    <p>Pilates, Yoga, Aquatics, Boxing, Jiu Jitsu, Dance, Spinning, Strength.</p>
                  </div>
                  <div className="panel-card">
                    <h3>Trial</h3>
                    <p>Native form bridge ready to push leads into Pulse.</p>
                  </div>
                  <div className="panel-card">
                    <h3>Portal</h3>
                    <p>Member login, account access, bookings, and billing paths.</p>
                  </div>
                  <div className="panel-card">
                    <h3>Widgets</h3>
                    <p>Universal script, individual embeds, hosted pages, and dynamic blocks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Training styles"
            title="A complete fitness club, not a one-note studio"
            description="PulseGym is designed to showcase how one website can sell multiple training experiences while still feeling organized, premium, and conversion-ready."
          />
          <div className="facility-grid">
            {spaces.map((space) => (
              <div key={space} className="facility-chip">
                {space}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured classes"
            title="Build the website around the living parts of the business"
            description="Classes and plans are the best candidates for dynamic website integration because they change often and directly affect conversion."
          />
          <div className="classes-grid">
            {featuredClasses.slice(0, 4).map((item) => (
              <ClassCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Memberships"
            title="Plans that can sync from the system to the website"
            description="This demo uses website-ready pricing cards, but the intended production model is clear: plan data lives in the system and the website simply consumes the public view."
          />
          <div className="plans-grid">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Integration modes"
            title="Four ways to connect Pulse to a client website"
            description="The website does not need to be rebuilt from scratch. PulseGym demonstrates the practical middle ground: keep the site, plug in the dynamic business blocks."
          />
          <div className="integration-grid">
            {integrationModes.map((item) => (
              <IntegrationCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Coaching"
            title="The club feels stronger when the coaches feel real"
            description="Use this section to demonstrate public instructor cards, coach bios, specialties, and future drill-down pages if you decide to expose them dynamically."
          />
          <div className="trainers-grid">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.name} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What members say"
            title="Social proof matters, but the site still needs clarity"
            description="A fitness website should balance aspiration and action. PulseGym is built to show both: premium atmosphere and straight-to-conversion pathways."
          />
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <blockquote>“{item.quote}”</blockquote>
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
              <span className="eyebrow">Demo launch path</span>
              <h2>Publish PulseGym first. Then connect the real dynamic blocks.</h2>
              <p>
                This site is already structured to demonstrate lead capture, trial booking, class discovery, pricing, and member portal access.
              </p>
            </div>
            <div className="hero-actions">
              <Link href="/free-trial" className="button button-primary">
                Open Trial Page
              </Link>
              <Link href="/portal" className="button button-ghost">
                View Member Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
