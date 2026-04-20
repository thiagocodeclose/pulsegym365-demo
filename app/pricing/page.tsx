'use client';

import Link from 'next/link';
import { ComparisonTable } from '@/components/ComparisonTable';
import { DynamicPricingPreview } from '@/components/DynamicPricingPreview';
import { ModeBadge } from '@/components/ModeBadge';
import { SectionHeading } from '@/components/SectionHeading';
import { useSiteMode } from '@/components/SiteModeProvider';
import { WidgetZone } from '@/components/WidgetZone';
import { comparisonRows, planComparisonRows, plans } from '@/lib/site-data';

const faqItems = [
  {
    q: 'Can I upgrade my plan later?',
    a: 'Yes. Members can move between plans at any time as training frequency or goals change. Upgrades take effect on the next billing cycle.'
  },
  {
    q: 'Do classes require reservations?',
    a: 'Most classes use reservations to secure spots, especially peak evening sessions. Walk-ins are welcome when space permits.'
  },
  {
    q: 'Is there a contract or commitment period?',
    a: 'PulseGym offers month-to-month and annual options. Annual plans get a lower monthly rate with no lock-in penalty after the first 3 months.'
  },
  {
    q: 'Can I pause my membership?',
    a: 'Members can pause for up to 60 days per year for travel, injury, or life events. No fees apply for the first pause request each year.'
  },
  {
    q: 'What happens to unused classes?',
    a: 'Unused class credits on Starter and Classes+ plans roll over for up to 30 days. After that, the allocation resets with the new billing period.'
  },
  {
    q: 'Is there a joining fee?',
    a: 'No joining fee for members who sign up online. In-club sign-ups may include a one-time $29 activation fee.'
  },
  {
    q: 'Can I bring a guest?',
    a: 'Classes+ includes 1 guest pass per month. All Access includes 2, and Performance+ includes 4. Additional passes can be purchased at the front desk.'
  },
  {
    q: 'How do I cancel?',
    a: 'Cancellations can be submitted online or in-club with 15 days notice before the next billing date. No cancellation fees on month-to-month plans.'
  }
];

export default function PricingPage() {
  const { mode, isPulse } = useSiteMode();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Memberships</span>
          <h1>Membership plans built for real training routines</h1>
          <p>Choose the membership level that fits your weekly rhythm, class preferences, and coaching goals.</p>
          {isPulse ? <ModeBadge mode="pulse" text="Live pricing" /> : null}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Choose your plan"
            description={
              isPulse
                ? 'Pulse-Powered mode shows system-connected pricing signals without changing the public gym website experience.'
                : 'Standard mode presents polished pricing cards for a classic gym website buying flow.'
            }
          />
          <WidgetZone widget="pricing" active={isPulse} label="Live membership pricing">
            <DynamicPricingPreview plans={plans} mode={mode} />
          </WidgetZone>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="Benefits comparison" title="What changes across plans" />
          <div className="comparison-table-wrap" role="region" aria-label="Plan benefits">
            <table className="comparison-table plan-comparison">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter</th>
                  <th>Classes+</th>
                  <th>All Access</th>
                  <th>Performance+</th>
                </tr>
              </thead>
              <tbody>
                {planComparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td>{row.starter}</td>
                    <td>{row.classesPlus}</td>
                    <td>{row.allAccess}</td>
                    <td>{row.performancePlus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Standard vs Pulse"
            title="Pricing block evolution"
            description="The page stays commercial and member-friendly in both modes while Pulse-Powered adds connected pricing behavior."
          />
          <ComparisonTable rows={comparisonRows.slice(0, 2)} />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="FAQs" title="Membership questions" />
          <div className="faq-grid">
            {faqItems.map((item) => (
              <article className="faq-card" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>

          <div className="cta-banner mt-section-md">
            <div>
              <span className="eyebrow">Ready to start</span>
              <h2>Claim your free trial and pick the right plan with a coach.</h2>
              <p>Our team helps new members choose the best entry point based on schedule and training goals.</p>
            </div>
            <div className="hero-actions">
              <Link href="/free-trial" className="button button-primary">
                Start Free Trial
              </Link>
              <Link href="/classes" className="button button-ghost">
                Browse Classes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
