import { ContactForm } from '@/components/ContactForm';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/lib/site-data';

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Contact</span>
          <h1>Visit the club or send a question</h1>
          <p>
            PulseGym uses the fictitious address provided for the demo website so the environment feels real enough for sales and integration demos.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-card">
            <SectionHeading title="Club details" description="Use this block as the public studio info section or future info widget target." />
            <p><strong>Address:</strong> {site.address}</p>
            <p><strong>Phone:</strong> {site.phone}</p>
            <p><strong>Email:</strong> {site.email}</p>
            <p><strong>Hours:</strong></p>
            {site.hours.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <div className="form-note">
              Tip: later this page can consume dynamic studio info from the system while keeping the overall website structure intact.
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
