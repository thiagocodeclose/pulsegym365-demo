import type { ClassItem, SiteMode } from '@/lib/site-data';
import { ClassCard } from './ClassCard';

export function DynamicClassesPreview({ classes, mode }: { classes: ClassItem[]; mode: SiteMode }) {
  return (
    <div className="classes-grid">
      {classes.map((item) => (
        <ClassCard key={item.name} item={item} mode={mode} />
      ))}
    </div>
  );
}
