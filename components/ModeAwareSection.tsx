import type { ReactNode } from 'react';
import type { SiteMode } from '@/lib/site-data';

type ModeAwareSectionProps = {
  mode: SiteMode;
  className?: string;
  children: ReactNode;
};

export function ModeAwareSection({ mode, className, children }: ModeAwareSectionProps) {
  return <section className={`mode-aware ${mode} ${className || ''}`.trim()}>{children}</section>;
}
