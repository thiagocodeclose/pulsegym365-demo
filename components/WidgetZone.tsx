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
  | 'member_portal';

interface WidgetZoneProps {
  widget: WidgetType;
  active: boolean;
  children: React.ReactNode;
  label?: string;
}

export function WidgetZone({ widget, active, children, label }: WidgetZoneProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);

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

  const src = `${codegym.baseUrl}/widgets/${widget}/${codegym.gymSlug}?embed=1`;

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
