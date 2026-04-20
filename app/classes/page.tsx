import { ClassCard } from '@/components/ClassCard';
import { SectionHeading } from '@/components/SectionHeading';
import { WidgetZone } from '@/components/WidgetZone';
import { featuredClasses } from '@/lib/site-data';

const filters = ['All', 'Mind & Body', 'Cardio & Energy', 'Combat & Discipline', 'Aquatics', 'Strength & Performance'];

export default function ClassesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-shell">
          <span className="eyebrow">Classes</span>
          <h1>Explore the full PulseGym class experience</h1>
          <p>
            This page is intentionally built like a strong demo target for the future Schedule Widget and public class catalog coming from Pulse.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Training categories"
            description="These filters are visual placeholders for the dynamic filtering logic you may later connect to the live class catalog."
          />
          <WidgetZone widgetType="schedule" minHeight={650} label="Schedule">
            <div className="filters-row">
              {filters.map((item, index) => (
                <span key={item} className="filter-chip" style={index === 0 ? { borderColor: 'rgba(245,124,0,.28)', color: '#fff' } : undefined}>
                  {item}
                </span>
              ))}
            </div>
            <div className="classes-grid" style={{ marginTop: '1rem' }}>
              {featuredClasses.map((item) => (
                <ClassCard key={item.name} item={item} />
              ))}
            </div>
          </WidgetZone>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading
            eyebrow="Sample schedule"
            title="Weekly schedule preview"
            description="A clean schedule block helps sell the value of dynamic class data without forcing the gym to rebuild its entire site."
          />
          <WidgetZone widgetType="schedule" minHeight={400} label="Weekly Schedule">
            <div className="schedule-board">
              <article className="schedule-card">
                <h3>Morning favorites</h3>
                <div className="schedule-lines">
                  <span className="schedule-line">7:00 AM · Reformer Pilates</span>
                  <span className="schedule-line">8:00 AM · Strength Floor Express</span>
                  <span className="schedule-line">9:00 AM · Aqua Conditioning</span>
                </div>
              </article>
              <article className="schedule-card">
                <h3>After work energy</h3>
                <div className="schedule-lines">
                  <span className="schedule-line">5:30 PM · Rhythm Ride</span>
                  <span className="schedule-line">6:30 PM · Power Yoga Flow</span>
                  <span className="schedule-line">7:15 PM · Boxing Fundamentals</span>
                </div>
              </article>
              <article className="schedule-card">
                <h3>Combat block</h3>
                <div className="schedule-lines">
                  <span className="schedule-line">6:30 PM · Boxing Conditioning</span>
                  <span className="schedule-line">8:00 PM · No-Gi Jiu Jitsu</span>
                  <span className="schedule-line">8:15 PM · Open Mat Skills</span>
                </div>
              </article>
            </div>
          </WidgetZone>
        </div>
      </section>
    </>
  );
}
