import type { ClassItem, SiteMode } from '@/lib/site-data';
import { ModeBadge } from './ModeBadge';

export function ClassCard({ item, mode = 'standard' }: { item: ClassItem; mode?: SiteMode }) {
  return (
    <article className={`class-card accent-${item.accent}`}>
      <div className="class-visual">
        <span>{item.group}</span>
      </div>
      <div className="class-body">
        {mode === 'pulse' ? <ModeBadge mode="pulse" /> : null}
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="class-meta">
          <span>{item.duration}</span>
          <span>{item.level}</span>
          <span>{item.capacity} spots</span>
        </div>
        {mode === 'pulse' && item.live ? (
          <div className="live-class-meta">
            <span>{item.live.nextSlot}</span>
            <span>{item.live.openSpots} spots left</span>
            <span>{item.live.status}</span>
            <span>Coach: {item.coach}</span>
          </div>
        ) : null}
        <div className="class-schedule">{item.schedule}</div>
      </div>
    </article>
  );
}
