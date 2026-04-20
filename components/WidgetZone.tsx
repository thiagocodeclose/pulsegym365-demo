'use client';

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
  | 'waitlist';

interface WidgetZoneProps {
  widget: WidgetType;
  active: boolean;
  children: React.ReactNode;
  label?: string;
}

export function WidgetZone({ widget, active, children, label }: WidgetZoneProps) {
  if (!active) return <>{children}</>;

  const src = `${codegym.baseUrl}/${widget}/${codegym.gymSlug}?embed=1`;

  return (
    <div className={`widget-zone widget-zone--${widget}`}>
      <iframe
        src={src}
        className={`widget-iframe widget-iframe--${widget}`}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="clipboard-write"
        loading="lazy"
        title={label || `${widget} widget`}
      />
    </div>
  );
}
