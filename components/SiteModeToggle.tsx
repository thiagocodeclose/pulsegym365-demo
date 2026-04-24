'use client';

import { useSiteMode } from './SiteModeProvider';

export function SiteModeToggle() {
  const { mode, setMode } = useSiteMode();

  return (
    <div className="site-mode-corner" role="group" aria-label="Switch website mode">
      <button
        type="button"
        className={`mode-chip-corner ${mode === 'standard' ? 'active' : ''}`}
        onClick={() => setMode('standard')}
      >
        Standard
      </button>
      <button
        type="button"
        className={`mode-chip-corner ${mode === 'pulse' ? 'active' : ''}`}
        onClick={() => setMode('pulse')}
      >
        ⚡ Powered by Koriva
      </button>
    </div>
  );
}
