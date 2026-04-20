import Link from 'next/link';
import { SectionHeading } from '@/components/SectionHeading';
import { PortalHostedLinks } from '@/components/PortalHostedLinks';

export default function PortalPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Member portal</span>
          <h1>A simple public entry point for members</h1>
          <p>
            This page demonstrates the website role clearly: the gym site helps members reach the portal quickly without turning the whole site into an application shell.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Portal entry options"
            description="Use this area for login, account management links, booking access, billing, or app download prompts once the real member portal is connected."
          />
          <PortalHostedLinks />
        </div>
      </section>
    </>
  );
}
