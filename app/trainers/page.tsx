import { SectionHeading } from '@/components/SectionHeading';
import { TrainerCard } from '@/components/TrainerCard';
import { WidgetZone } from '@/components/WidgetZone';
import { trainers } from '@/lib/site-data';

export default function TrainersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Coaches</span>
          <h1>Experts across every room in the club</h1>
          <p>
            Trainers and instructors help the website feel human. They also make the future instructor widget immediately useful and believable.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Meet the PulseGym coaching team"
            description="This page is intentionally broad because the club offers multiple experiences, from combat sports to mobility, cycling, aquatics, and strength."
          />
          <WidgetZone widgetType="instructors" minHeight={500} label="Instructors">
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
