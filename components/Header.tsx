'use client';

import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site-data';
import { useSiteMode } from './SiteModeProvider';
import { SiteModeToggle } from './SiteModeToggle';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/classes', label: 'Classes' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/trainers', label: 'Trainers' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  const { mode } = useSiteMode();
  const isPulse = mode === 'pulse';

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" className="brand-mark" aria-label={`${site.name} home`}>
          <Image src="/logo.png" alt={`${site.name} logo`} width={200} height={72} priority />
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <SiteModeToggle />
          {isPulse && (
            <Link href="/portal" className="button button-ghost">
              Member Login
            </Link>
          )}
          <Link href="/free-trial" className="button button-primary">
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}
