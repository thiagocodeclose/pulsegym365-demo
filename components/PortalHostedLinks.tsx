'use client';

import { useSiteMode } from './SiteModeProvider';
import { ModeBadge } from './ModeBadge';
import { codegym } from '@/lib/site-data';

const { baseUrl, gymSlug } = codegym;

const portalUrl = codegym.memberPortalUrl || `${baseUrl}/portal/${gymSlug}`;

const standardCards = [
  { title: 'Member Login', desc: 'Secure sign-in to check bookings and account details.' },
  { title: 'Class Bookings', desc: 'View and manage your existing class reservations.' },
  { title: 'Membership', desc: 'Review current plan details and renewal dates.' },
  { title: 'Billing Support', desc: 'Get help with invoices and payment methods.' }
];

const getPulseCards = () => {
  const cards = [
    {
      title: 'Bookings',
      desc: 'Live class bookings and open spots synced from Pulse.',
      cta: 'Open booking flow',
      href: `${baseUrl}/schedule/${gymSlug}`
    },
    {
      title: 'Membership',
      desc: 'Connected plan details, upgrades, and renewal actions.',
      cta: 'View membership options',
      href: `${baseUrl}/pricing/${gymSlug}`
    },
    {
      title: 'Billing',
      desc: 'Billing access with connected account and payment history.',
      cta: 'Manage billing',
      href: portalUrl
    },
    {
      title: 'Free Trial',
      desc: 'Guest pass and first trial booking linked to Pulse pipeline.',
      cta: 'Claim guest pass',
      href: `${baseUrl}/guest-pass/${gymSlug}`
    },
    ...(codegym.ecommerceUrl
      ? [{
          title: 'Shop',
          desc: 'Browse gear, supplements, and merchandise from Pulse.',
          cta: 'Visit our shop',
          href: codegym.ecommerceUrl
        }]
      : [])
  ];
  return cards;
};

export function PortalHostedLinks() {
  const { isPulse } = useSiteMode();

  if (!isPulse) {
    return (
      <>
        <ModeBadge mode="standard" text="Standard Member Entry" subtle />
        <div className="portal-grid">
          {standardCards.map((card) => (
            <article className="portal-card" key={card.title}>
              <strong>{card.title}</strong>
              <span>{card.desc}</span>
            </article>
          ))}
        </div>
        <div className="cta-banner mt-section-sm">
          <div>
            <span className="eyebrow">Member access</span>
            <h2>Simple and familiar member login flow.</h2>
            <p>Keep the website public and easy while members use a direct login entry point.</p>
          </div>
          <div className="hero-actions">
            <a href="#" className="button button-primary">
              Member Login
            </a>
          </div>
        </div>
      </>
    );
  }

  const pulseCards = getPulseCards();

  return (
    <>
      <ModeBadge mode="pulse" text="Connected Portal Experience" />
      <div className="portal-grid">
        {pulseCards.map((card) => (
          <a
            className="portal-card pulse portal-card-link"
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>{card.title}</strong>
            <span>{card.desc}</span>
            <span className="portal-cta">{card.cta} &rarr;</span>
          </a>
        ))}
      </div>

      <div className="cta-banner mt-section-sm">
        <div>
          <span className="eyebrow">Pulse-Powered</span>
          <h2>Portal access connected to the Pulse member ecosystem.</h2>
          <p>Bookings, membership, billing, and support paths are connected from this public website entry.</p>
        </div>
        <div className="hero-actions">
          <a href={`${baseUrl}/guest-pass/${gymSlug}`} target="_blank" rel="noopener noreferrer" className="button button-ghost">
            Claim Guest Pass
          </a>
          <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">
            Open Member Access
          </a>
        </div>
      </div>
    </>
  );
}
