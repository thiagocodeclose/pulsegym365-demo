import type { SiteMode } from '@/lib/site-data';

type ModeBadgeProps = {
  mode: SiteMode;
  text?: string;
  subtle?: boolean;
};

export function ModeBadge({ mode, text, subtle = false }: ModeBadgeProps) {
  const label = text || (mode === 'pulse' ? 'Live from Pulse' : 'Standard Website');

  return (
    <span className={`mode-badge ${mode} ${subtle ? 'subtle' : ''}`}>
      {mode === 'pulse' ? <span className="mode-dot" /> : null}
      {label}
    </span>
  );
}
