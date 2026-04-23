'use client';

import { useSiteMode } from './SiteModeProvider';

export function SiteModeToggle() {
  const { mode, setMode } = useSiteMode();

  return (
    <div className="site-mode-inline" role="group" aria-label="Switch website mode">
      <button
        type="button"
        className={`mode-chip-sm ${mode === 'standard' ? 'active' : ''}`}
        onClick={() => setMode('standard')}
      >
        Standard
      </button>
      <button
        type="button"
        className={`mode-chip-sm ${mode === 'pulse' ? 'active' : ''}`}
        onClick={() => setMode('pulse')}
      >
        ⚡ Pulse
      </button>
    </div>
  );
}
