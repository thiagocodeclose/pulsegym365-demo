'use client';

import { useDemo } from './DemoProvider';
import { type ReactNode } from 'react';

/**
 * WidgetZone — Renders static content OR a CodeGym widget iframe based on demo state.
 *
 * When demo is OFF: renders children (the static site content).
 * When demo is ON: replaces children with a CodeGym widget iframe.
 *
 * Usage:
 *   <WidgetZone widgetType="schedule" minHeight={600}>
 *     <div className="classes-grid">...static cards...</div>
 *   </WidgetZone>
 */

const CODEGYM_URL = process.env.NEXT_PUBLIC_CODEGYM_URL || 'https://codegym-bolt.vercel.app';
const GYM_SLUG = process.env.NEXT_PUBLIC_GYM_SLUG || 'pulsegym365';

interface WidgetZoneProps {
  widgetType: string;
  children: ReactNode;
  minHeight?: number;
  label?: string;
}

export function WidgetZone({ widgetType, children, minHeight = 500, label }: WidgetZoneProps) {
  const { isActive } = useDemo();

  if (!isActive) {
    return <>{children}</>;
  }

  const widgetUrl = `${CODEGYM_URL}/widgets/${widgetType}/${GYM_SLUG}?embed=1`;

  return (
    <div style={{ position: 'relative' }}>
      {/* Active badge */}
      <div style={styles.badge as any}>
        <span style={styles.dot as any} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
          LIVE — {label || widgetType} widget
        </span>
      </div>

      {/* Widget iframe */}
      <div style={{
        ...styles.iframeWrapper as any,
        minHeight,
      }}>
        <iframe
          src={widgetUrl}
          style={styles.iframe as any}
          title={`CodeGym ${widgetType} widget`}
          allow="payment"
          loading="lazy"
        />
      </div>
    </div>
  );
}

/**
 * GlobalWidgets — Injects the chat bubble and social proof banner site-wide when demo is active.
 */
export function GlobalWidgets() {
  const { isActive } = useDemo();
  if (!isActive) return null;

  const chatUrl = `${CODEGYM_URL}/widgets/chat/${GYM_SLUG}?embed=1`;

  return (
    <>
      {/* AI Chat widget — floating bottom-right */}
      <iframe
        src={chatUrl}
        title="CodeGym AI Chat"
        allow="payment"
        loading="lazy"
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: 400,
          height: 620,
          border: 'none',
          zIndex: 9998,
          pointerEvents: 'auto',
          background: 'transparent',
        }}
      />
    </>
  );
}

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.8rem',
    background: 'rgba(44, 207, 114, 0.12)',
    border: '1px solid rgba(44, 207, 114, 0.25)',
    borderRadius: 999,
    marginBottom: '1rem',
    color: '#2ccf72',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#2ccf72',
    boxShadow: '0 0 8px #2ccf72',
    display: 'inline-block',
    animation: 'pulse-dot 2s ease infinite',
  },
  iframeWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.2)',
  },
  iframe: {
    width: '100%',
    height: '100%',
    minHeight: 'inherit',
    border: 'none',
    borderRadius: 20,
  },
};
