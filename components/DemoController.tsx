'use client';

import { usePathname } from 'next/navigation';
import { useDemo } from './DemoProvider';
import { useState } from 'react';

const MODE_ICONS: Record<string, string> = {
  universal: '⚡',
  individual: '🧩',
  'form-bridge': '🔌',
  hosted: '🔗',
  none: '📄',
};

const MODE_COLORS: Record<string, string> = {
  universal: '#f57c00',
  individual: '#2a6df6',
  'form-bridge': '#2ccf72',
  hosted: '#8e67ff',
  none: '#b9b9b9',
};

export function DemoController() {
  const { isActive, toggle, getPageIntegration } = useDemo();
  const pathname = usePathname();
  const integration = getPageIntegration(pathname);
  const [copied, setCopied] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const modeColor = MODE_COLORS[integration.mode] || '#b9b9b9';
  const modeIcon = MODE_ICONS[integration.mode] || '📄';

  function handleCopy() {
    navigator.clipboard.writeText(integration.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Minimized state — small floating pill
  if (minimized) {
    return (
      <div style={styles.minimizedPill as any}>
        <button
          onClick={() => setMinimized(false)}
          style={styles.minimizedButton as any}
          title="Open demo controller"
        >
          <span style={{ fontSize: '1.1rem' }}>⚙️</span>
          <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>Demo</span>
          {isActive && (
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#2ccf72', display: 'inline-block',
              boxShadow: '0 0 6px #2ccf72',
            }} />
          )}
        </button>
      </div>
    );
  }

  return (
    <div style={styles.panel as any}>
      {/* Header */}
      <div style={styles.header as any}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.15rem' }}>⚙️</span>
          <span style={{ fontWeight: 800, fontSize: '0.92rem', letterSpacing: '-0.02em' }}>
            Integration Demo
          </span>
        </div>
        <button
          onClick={() => setMinimized(true)}
          style={styles.closeBtn as any}
          title="Minimize"
        >
          ✕
        </button>
      </div>

      {/* Toggle */}
      <div style={styles.toggleRow as any}>
        <div style={{ display: 'flex', flexDirection: 'column' as any, gap: '0.15rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#999', fontWeight: 600, textTransform: 'uppercase' as any, letterSpacing: '0.08em' }}>
            Website mode
          </span>
          <span style={{ fontSize: '0.92rem', fontWeight: 700, color: isActive ? '#2ccf72' : '#ff6b6b' }}>
            {isActive ? '⚡ With CodeGym' : '📄 Static Website'}
          </span>
        </div>
        <button onClick={toggle} aria-label={isActive ? 'Deactivate CodeGym demo' : 'Activate CodeGym demo'} style={{
          ...styles.toggleSwitch as any,
          background: isActive
            ? 'linear-gradient(135deg, #2ccf72, #0fb7a7)'
            : 'rgba(255,255,255,0.1)',
        }}>
          <span style={{
            ...styles.toggleKnob as any,
            transform: isActive ? 'translateX(22px)' : 'translateX(2px)',
          }} />
        </button>
      </div>

      {/* Current page integration info */}
      <div style={styles.infoBlock as any}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 26, height: 26, borderRadius: 8,
            background: `${modeColor}22`, fontSize: '0.9rem',
          }}>
            {modeIcon}
          </span>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: modeColor }}>
            {integration.label}
          </span>
        </div>
        <p style={styles.infoText as any}>
          {integration.description}
        </p>
      </div>

      {/* Code snippet */}
      <div style={styles.codeBlock as any}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#888', fontWeight: 600, textTransform: 'uppercase' as any, letterSpacing: '0.08em' }}>
            Code to add
          </span>
          <button onClick={handleCopy} style={styles.copyBtn as any}>
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
        <pre style={styles.pre as any}>
          <code>{integration.code}</code>
        </pre>
      </div>

      {/* Footer note */}
      <div style={styles.footer as any}>
        <span style={{ fontSize: '0.72rem', color: '#666' }}>
          Navigate pages to see different integration modes
        </span>
      </div>
    </div>
  );
}

// ── Inline styles (no dependency on global CSS) ──────────────

const styles = {
  panel: {
    position: 'fixed',
    bottom: '1.25rem',
    left: '1.25rem',
    width: 320,
    zIndex: 9999,
    background: 'linear-gradient(180deg, #1a1a1a, #111)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 20,
    boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#fff',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem 0.55rem',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: '0.25rem',
    borderRadius: 6,
    transition: 'color 0.2s',
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  toggleSwitch: {
    position: 'relative' as any,
    width: 48,
    height: 26,
    borderRadius: 999,
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
    flexShrink: 0,
  },
  toggleKnob: {
    position: 'absolute' as any,
    top: 2,
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    transition: 'transform 0.3s',
  },
  infoBlock: {
    padding: '0.7rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  infoText: {
    margin: 0,
    fontSize: '0.78rem',
    lineHeight: 1.55,
    color: '#aaa',
  },
  codeBlock: {
    padding: '0.7rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  pre: {
    margin: 0,
    padding: '0.6rem 0.7rem',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 10,
    fontSize: '0.72rem',
    lineHeight: 1.6,
    color: '#8e67ff',
    overflowX: 'auto' as any,
    fontFamily: '"SF Mono", "Fira Code", monospace',
  },
  copyBtn: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#ccc',
    fontSize: '0.72rem',
    fontWeight: 600,
    padding: '0.25rem 0.6rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  footer: {
    padding: '0.5rem 1rem',
    textAlign: 'center' as any,
  },
  minimizedPill: {
    position: 'fixed',
    bottom: '1.25rem',
    left: '1.25rem',
    zIndex: 9999,
  },
  minimizedButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.5rem 0.85rem',
    background: 'linear-gradient(180deg, #1a1a1a, #111)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 999,
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    transition: 'transform 0.2s',
  },
};
