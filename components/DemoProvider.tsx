'use client';

import type { ReactNode } from 'react';
import { SiteModeProvider, useSiteMode } from './SiteModeProvider';

export function DemoProvider({ children }: { children: ReactNode }) {
  return <SiteModeProvider>{children}</SiteModeProvider>;
}

export function useDemo() {
  const { isPulse, toggleMode, setMode, mode } = useSiteMode();

  return {
    isActive: isPulse,
    toggle: toggleMode,
    activate: () => setMode('pulse'),
    deactivate: () => setMode('standard'),
    mode,
    getPageIntegration: () => ({
      mode: isPulse ? 'pulse' : 'standard',
      label: isPulse ? 'Pulse-Powered Website' : 'Standard Website',
      description: isPulse
        ? 'Connected website blocks are active for classes, pricing, trial, and portal experiences.'
        : 'Static website blocks are active across classes, pricing, trial, and portal experiences.',
      code: isPulse ? 'mode=pulse' : 'mode=standard',
      widgets: isPulse ? ['pricing', 'schedule', 'trial', 'portal'] : []
    })
  };
}
