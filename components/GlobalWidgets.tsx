'use client';

import Script from 'next/script';
import { useSiteMode } from './SiteModeProvider';
import { codegym } from '@/lib/site-data';

export function GlobalWidgets() {
  const { isPulse } = useSiteMode();

  if (!isPulse) return null;

  // data-floating-only="true": the loader will only auto-inject floating widgets
  // (chat, social_proof). All inline widgets are managed by WidgetZone components
  // throughout each page, so we avoid duplicate iframes being appended to <body>.
  return (
    <Script
      src={`${codegym.baseUrl}/widgets/loader.js`}
      strategy="lazyOnload"
      id="codegym-universal-loader"
      data-gym={codegym.gymSlug}
      data-key={codegym.widgetKey}
      data-floating-only="true"
    />
  );
}

