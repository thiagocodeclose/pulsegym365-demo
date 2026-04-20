'use client';

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

const baseUrl =
  process.env.NEXT_PUBLIC_CODEGYM_URL || 'https://codegym-bolt.vercel.app';
const gymSlug = process.env.NEXT_PUBLIC_GYM_SLUG || 'pulsegym365';

export function WidgetZone({ widget, active, children, label }: WidgetZoneProps) {
  if (!active) return <>{children}</>;

  const src = `${baseUrl}/${widget}/${gymSlug}?embed=1`;

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
