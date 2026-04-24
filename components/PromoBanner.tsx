'use client';

import { useSiteMode } from './SiteModeProvider';
import { WidgetZone } from './WidgetZone';

export function PromoBanner() {
  const { isPulse } = useSiteMode();

  if (!isPulse) return null;

  return (
    <WidgetZone widget="announcement_bar" active={true} label="Announcement bar">
      {/* No fallback — in Standard mode nothing renders */}
      <span />
    </WidgetZone>
  );
}

