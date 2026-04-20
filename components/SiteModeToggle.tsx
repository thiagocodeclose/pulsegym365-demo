'use client';

import { useSiteMode } from './SiteModeProvider';

export function SiteModeToggle() {
  const { mode, setMode } = useSiteMode();

  return (
    <div className="site-mode-wrap" aria-label="Website mode selector">
      <div className="container">
        <div className="site-mode-toggle" role="group" aria-label="Switch website mode">
          <span className="site-mode-label">Website view</span>
          <button
            type="button"
            className={`mode-chip ${mode === 'standard' ? 'active' : ''}`}
            onClick={() => setMode('standard')}
          >
            Standard
          </button>
          <button
            type="button"
            className={`mode-chip ${mode === 'pulse' ? 'active' : ''}`}
            onClick={() => setMode('pulse')}
          >
            Pulse-Powered
          </button>
        </div>
      </div>
    </div>
  );
}
