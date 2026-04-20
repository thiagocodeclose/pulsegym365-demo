'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type IntegrationMode = 'universal' | 'individual' | 'form-bridge' | 'hosted' | 'none';

interface PageIntegration {
  mode: IntegrationMode;
  label: string;
  description: string;
  code: string;
  widgets: string[];
}

const PAGE_INTEGRATIONS: Record<string, PageIntegration> = {
  '/': {
    mode: 'universal',
    label: 'Universal Script',
    description: 'One script tag loads all enabled widgets automatically. The AI Chat and Social Proof appear site-wide.',
    code: `<script src="https://app.codegym.com/widgets/loader.js"\n  data-gym="pulsegym365"\n  async>\n</script>`,
    widgets: ['chat', 'social_proof'],
  },
  '/classes': {
    mode: 'individual',
    label: 'Individual Widget',
    description: 'A single div replaces the static class cards with a live, interactive schedule pulled from the system.',
    code: `<div\n  data-codegym="schedule"\n  data-gym="pulsegym365"\n></div>`,
    widgets: ['schedule'],
  },
  '/pricing': {
    mode: 'individual',
    label: 'Individual Widget',
    description: 'The static pricing cards are replaced by live plan data with built-in Stripe Checkout.',
    code: `<div\n  data-codegym="pricing"\n  data-gym="pulsegym365"\n></div>`,
    widgets: ['pricing'],
  },
  '/trainers': {
    mode: 'individual',
    label: 'Individual Widget',
    description: 'Static coach bios become dynamic instructor profiles with real specialties, ratings, and class counts.',
    code: `<div\n  data-codegym="instructors"\n  data-gym="pulsegym365"\n></div>`,
    widgets: ['instructors'],
  },
  '/free-trial': {
    mode: 'form-bridge',
    label: 'Native Form Bridge',
    description: 'The existing trial form stays — just add 2 attributes. Leads flow into the CodeGym pipeline with attribution and AI follow-up.',
    code: `<form\n  data-codegym-form\n  data-gym="pulsegym365"\n  data-form-type="trial_pass"\n>\n  <!-- your existing fields -->\n</form>`,
    widgets: ['lead_capture'],
  },
  '/contact': {
    mode: 'individual',
    label: 'Individual Widget',
    description: 'Replace the static studio info with a live widget showing real hours, address, amenities, and contact.',
    code: `<div\n  data-codegym="info"\n  data-gym="pulsegym365"\n></div>`,
    widgets: ['info'],
  },
  '/portal': {
    mode: 'hosted',
    label: 'Hosted Pages',
    description: 'Link directly to CodeGym-hosted pages for signup, login, and member portal access. Zero code needed.',
    code: `<!-- In your links -->\n<a href="https://app.codegym.com/signup/pulsegym365">\n  Join Now\n</a>\n<a href="https://app.codegym.com/portal/pulsegym365">\n  Member Login\n</a>`,
    widgets: [],
  },
};

interface DemoContextValue {
  isActive: boolean;
  toggle: () => void;
  activate: () => void;
  deactivate: () => void;
  getPageIntegration: (path: string) => PageIntegration;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  const toggle = useCallback(() => setIsActive((v) => !v), []);
  const activate = useCallback(() => setIsActive(true), []);
  const deactivate = useCallback(() => setIsActive(false), []);

  const getPageIntegration = useCallback((path: string): PageIntegration => {
    const clean = path.replace(/\/$/, '') || '/';
    return PAGE_INTEGRATIONS[clean] || PAGE_INTEGRATIONS['/'];
  }, []);

  return (
    <DemoContext.Provider value={{ isActive, toggle, activate, deactivate, getPageIntegration }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within DemoProvider');
  return ctx;
}
