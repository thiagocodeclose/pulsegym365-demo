import type { ClassItem } from '@/lib/site-data';

export function ClassCard({ item }: { item: ClassItem }) {
  return (
    <article className={`class-card accent-${item.accent}`}>
      <div className="class-visual">
        <span>{item.group}</span>
      </div>
      <div className="class-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="class-meta">
          <span>{item.duration}</span>
          <span>{item.level}</span>
          <span>{item.capacity} spots</span>
        </div>
        <div className="class-schedule">{item.schedule}</div>
      </div>
    </article>
  );
}
