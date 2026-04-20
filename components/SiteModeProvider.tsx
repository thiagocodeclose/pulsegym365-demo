'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { SiteMode } from '@/lib/site-data';

const STORAGE_KEY = 'pulsegym_site_mode';

type SiteModeContextValue = {
  mode: SiteMode;
  isPulse: boolean;
  isStandard: boolean;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;
};

const SiteModeContext = createContext<SiteModeContextValue | null>(null);

function readModeFromQuery(): SiteMode | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  if (mode === 'pulse' || mode === 'standard') return mode;
  return null;
}

function readModeFromStorage(): SiteMode | null {
  if (typeof window === 'undefined') return null;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'pulse' || saved === 'standard' ? saved : null;
}

function writeQuery(mode: SiteMode) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set('mode', mode);
  window.history.replaceState({}, '', url.toString());
}

export function SiteModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<SiteMode>('standard');

  useEffect(() => {
    const fromQuery = readModeFromQuery();
    const fromStorage = readModeFromStorage();
    const initial = fromQuery || fromStorage || 'standard';
    setModeState(initial);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.siteMode = mode;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, mode);
      writeQuery(mode);
    }
  }, [mode]);

  const setMode = useCallback((next: SiteMode) => {
    setModeState(next);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'standard' ? 'pulse' : 'standard'));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      isPulse: mode === 'pulse',
      isStandard: mode === 'standard',
      setMode,
      toggleMode
    }),
    [mode, setMode, toggleMode]
  );

  return <SiteModeContext.Provider value={value}>{children}</SiteModeContext.Provider>;
}

export function useSiteMode() {
  const context = useContext(SiteModeContext);
  if (!context) {
    throw new Error('useSiteMode must be used within SiteModeProvider');
  }
  return context;
}
