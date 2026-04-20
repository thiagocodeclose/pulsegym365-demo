import { SectionHeading } from '@/components/SectionHeading';
import { TrialForm } from '@/components/TrialForm';
import { integrationModes } from '@/lib/site-data';

export default function FreeTrialPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Free trial</span>
          <h1>Use this as the demo conversion page</h1>
          <p>
            This page is built to mimic the real-world scenario where a gym wants a strong website trial flow today and system-powered lead handling tomorrow.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <TrialForm />
          <div className="contact-card">
            <SectionHeading
              eyebrow="Why this matters"
              title="The website should capture demand without forcing a rebuild"
              description="That is the practical product story. Keep the client website, then upgrade the conversion layers with Pulse where it matters most."
            />
            <div className="schedule-lines">
              <span className="schedule-line">Lead capture with attribution</span>
              <span className="schedule-line">AI handoff for questions and follow-up</span>
              <span className="schedule-line">Future booking or guest pass flow</span>
              <span className="schedule-line">Later member onboarding and portal access</span>
            </div>
            <div className="form-note">
              Demo idea: this page can represent either a hosted Pulse page or a native website form bridged into the system.
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Integration modes"
            title="Use the same business logic in multiple ways"
            description="A gym may want direct hosted pages for ads, embedded widgets on the main site, or a form bridge that preserves the existing website layout."
          />
          <div className="integration-grid">
            {integrationModes.map((item) => (
              <article className="integration-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <pre>{item.code}</pre>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
