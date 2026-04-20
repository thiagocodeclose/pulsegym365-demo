"use client";

import { ContactForm } from '@/components/ContactForm';
import { ModeBadge } from '@/components/ModeBadge';
import { SectionHeading } from '@/components/SectionHeading';
import { useSiteMode } from '@/components/SiteModeProvider';
import { WidgetZone } from '@/components/WidgetZone';
import { site } from '@/lib/site-data';

export default function ContactPage() {
  const { isPulse } = useSiteMode();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Contact</span>
          <h1>Visit the club or send a question</h1>
          <p>
            Talk to our team about memberships, classes, coaching, and your first trial week at PulseGym.
          </p>
          {isPulse ? <ModeBadge mode="pulse" text="AI-ready support routing" /> : null}
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-card">
            <WidgetZone widget="info" active={isPulse} label="Live studio info">
              <>
                <SectionHeading title="Club details" description="PulseGym is built to feel premium, welcoming, and easy to access for first-time visitors." />
                <p><strong>Address:</strong> {site.addressLine1}</p>
                <p><strong>City/State:</strong> {site.addressLine2}</p>
                <p><strong>Phone:</strong> {site.phone}</p>
                <p><strong>Email:</strong> {site.email}</p>
                <p><strong>Hours:</strong></p>
                {site.hours.map((item) => (
                  <p key={item}>{item}</p>
                ))}
                <div className="form-note">
                  Standard mode keeps a simple, familiar contact experience for gym website visitors.
                </div>
              </>
            </WidgetZone>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
