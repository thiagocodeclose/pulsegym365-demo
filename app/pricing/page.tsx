import Link from 'next/link';
import { PlanCard } from '@/components/PlanCard';
import { SectionHeading } from '@/components/SectionHeading';
import { plans } from '@/lib/site-data';

export default function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Memberships</span>
          <h1>Clear plans. Strong pricing page. Easy website sync.</h1>
          <p>
            For production, the recommended model is simple: plans are managed in the system and the website consumes only the public version.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Choose the membership style"
            description="This page is ready to become a dynamic public pricing page. For now, it demonstrates the target visual structure and conversion logic."
          />
          <div className="plans-grid">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="cta-banner">
            <div>
              <span className="eyebrow">Recommended implementation</span>
              <h2>System is the source of truth. Website is the public layer.</h2>
              <p>
                Change a plan in Pulse, publish it, and let the website update automatically. No duplicate pricing tables. No stale website copy.
              </p>
            </div>
            <div className="hero-actions">
              <Link href="/free-trial" className="button button-primary">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
