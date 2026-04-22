'use client';

import Script from 'next/script';
import { useSiteMode } from './SiteModeProvider';
import { codegym } from '@/lib/site-data';

export function GlobalWidgets() {
  const { isPulse } = useSiteMode();

  if (!isPulse) return null;

  // Universal script: auto-injects all enabled widgets including the floating AI Chat
  return (
    <Script
      src={`${codegym.baseUrl}/widgets/loader.js`}
      strategy="lazyOnload"
      id="codegym-universal-loader"
      data-gym={codegym.gymSlug}
      data-key={codegym.widgetKey}
    />
  );
}
