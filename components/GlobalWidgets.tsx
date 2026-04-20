'use client';

import Script from 'next/script';
import { useSiteMode } from './SiteModeProvider';

const baseUrl =
  process.env.NEXT_PUBLIC_CODEGYM_URL || 'https://codegym-bolt.vercel.app';
const gymSlug = process.env.NEXT_PUBLIC_GYM_SLUG || 'pulsegym365';

export function GlobalWidgets() {
  const { isPulse } = useSiteMode();

  if (!isPulse) return null;

  // Universal script: auto-injects all enabled widgets including the floating AI Chat
  return (
    <Script
      src={`${baseUrl}/w/${gymSlug}.js`}
      strategy="lazyOnload"
      id="codegym-universal-loader"
    />
  );
}
