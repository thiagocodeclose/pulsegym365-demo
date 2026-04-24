'use client';

import { useEffect, useRef, useState } from 'react';
import { codegym } from '@/lib/site-data';

type WidgetType =
  | 'schedule'
  | 'pricing'
  | 'instructors'
  | 'info'
  | 'chat'
  | 'lead_capture'
  | 'reviews'
  | 'guest_pass'
  | 'events'
  | 'appointment'
  | 'social_proof'
  | 'live_feed'
  | 'community'
  | 'wod'
  | 'gift_card'
  | 'waitlist'
  | 'hours'
  | 'classes'
  | 'programs'
  | 'promo_banners'
  | 'hero'
  | 'member_portal'
  | 'announcement_bar';

interface WidgetZoneProps {
  widget: WidgetType;
  active: boolean;
  children: React.ReactNode;
  label?: string;
}

export function WidgetZone({ widget, active, children, label }: WidgetZoneProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [src, setSrc] = useState<string>(
    `${codegym.baseUrl}/widgets/${widget}/${codegym.gymSlug}?embed=1`
  );

  // Fetch widget config to apply saved layout overrides and per-widget color overrides
  useEffect(() => {
    if (!active) return;
    fetch(`${codegym.baseUrl}/api/widgets/config?slug=${codegym.gymSlug}`)
      .then((r) => r.json())
      .then((config) => {
        if (!config || config.error) return;
        const params = new URLSearchParams({ embed: '1' });

        // Global theme (base layer)
        const t = config.theme || {};
        if (t.primary_color) params.set('cg_primary', t.primary_color);
        if (t.secondary_color) params.set('cg_secondary', t.secondary_color);
        if (t.accent_color) params.set('cg_accent', t.accent_color);
        if (t.bg_color) params.set('cg_bg', t.bg_color);
        if (t.text_color) params.set('cg_text', t.text_color);
        if (t.cta_color) params.set('cg_cta', t.cta_color);
        if (t.font_family) params.set('cg_font', t.font_family);
        if (t.border_radius) params.set('cg_radius', String(t.border_radius));
        if (t.mode) params.set('cg_mode', t.mode);

        // Per-widget overrides (higher priority than global theme)
        const wc = (config.widgets || []).find((w: any) => w.type === widget);
        if (wc) {
          const wto = wc.theme_overrides || {};
          if (wto.primary) params.set('cg_primary', wto.primary);
          if (wto.background) params.set('cg_bg', wto.background);
          if (wto.text) params.set('cg_text', wto.text);
          if (wto.accent) params.set('cg_accent', wto.accent);
          if (wto.cta_color) params.set('cg_cta', wto.cta_color);

          // Layout + field visibility overrides
          const ov = wc.widget_overrides || wc.overrides || {};
          if (Object.keys(ov).length > 0) {
            try {
              params.set('overrides', btoa(encodeURIComponent(JSON.stringify(ov))));
            } catch (_) {}
          }
        }

        setSrc(`${codegym.baseUrl}/widgets/${widget}/${codegym.gymSlug}?${params.toString()}`);
      })
      .catch(() => {}); // Keep default src on error
  }, [active, widget]);

  useEffect(() => {
    if (!active) return;

    const handler = (event: MessageEvent) => {
      const msg = event.data;
      if (!msg || msg.source !== 'codegym-widget') return;
      if (msg.type !== 'widget:resize') return;
      if (msg.widget !== widget) return;
      if (typeof msg.payload?.height === 'number' && msg.payload.height > 0) {
        setHeight(msg.payload.height);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [active, widget]);

  if (!active) return <>{children}</>;

  return (
    <div className={`widget-zone widget-zone--${widget}`}>
      <iframe
        ref={iframeRef}
        src={src}
        className={`widget-iframe widget-iframe--${widget}`}
        style={height ? { height: `${height}px`, minHeight: 0 } : undefined}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="clipboard-write"
        loading="lazy"
        title={label || `${widget} widget`}
      />
    </div>
  );
}
