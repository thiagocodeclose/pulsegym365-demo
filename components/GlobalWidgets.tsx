'use client';

import { useEffect } from 'react';
import { useSiteMode } from './SiteModeProvider';
import { codegym } from '@/lib/site-data';

export function GlobalWidgets() {
  const { isPulse } = useSiteMode();

  useEffect(() => {
    if (isPulse) {
      // If the loader was already executed (previous Pulse session), call its
      // public re-inject API directly — avoids duplicate event listeners from
      // re-appending the <script> tag.
      if (typeof (window as any)._cgInject === 'function') {
        (window as any)._cgInject(codegym.gymSlug, true);
        return;
      }

      // First load: inject the loader script tag. The IIFE runs immediately,
      // reads data-gym / data-key / data-floating-only, and calls autoInject.
      const script = document.createElement('script');
      script.id = 'codegym-universal-loader';
      script.src = `${codegym.baseUrl}/widgets/loader.js`;
      script.setAttribute('data-gym', codegym.gymSlug);
      script.setAttribute('data-key', codegym.widgetKey);
      script.setAttribute('data-floating-only', 'true');
      document.head.appendChild(script);
    } else {
      // Standard mode: remove all floating widget containers injected by loader.js
      document.querySelectorAll('[data-cg-widget]').forEach((el) => el.remove());
    }
  }, [isPulse]);

  return null;
}


