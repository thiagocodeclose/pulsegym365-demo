"use client";

import { SectionHeading } from '@/components/SectionHeading';
import { TrainerCard } from '@/components/TrainerCard';
import { ModeBadge } from '@/components/ModeBadge';
import { useSiteMode } from '@/components/SiteModeProvider';
import { WidgetZone } from '@/components/WidgetZone';
import { trainers } from '@/lib/site-data';

export default function TrainersPage() {
  const { isPulse } = useSiteMode();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Coaches</span>
          <h1>Experts across every room in the club</h1>
          <p>
            PulseGym coaches combine technical training expertise with member-first support across all modalities.
          </p>
          {isPulse ? <ModeBadge mode="pulse" text="Coach highlights connected" /> : null}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Meet the PulseGym coaching team"
            description="From mobility and yoga to combat and performance training, our coaches help members progress with confidence."
          />
          <WidgetZone widget="instructors" active={isPulse} label="Live coach profiles">
            <div className="trainers-grid">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer.name} trainer={trainer} />
              ))}
            </div>
          </WidgetZone>
        </div>
      </section>
    </>
  );
}
