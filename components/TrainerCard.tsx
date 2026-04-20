import type { Trainer } from '@/lib/site-data';

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <article className={`trainer-card accent-${trainer.accent}`}>
      <div className="trainer-avatar">{trainer.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
      <div>
        <h3>{trainer.name}</h3>
        <p className="trainer-specialty">{trainer.specialty}</p>
        <p>{trainer.bio}</p>
      </div>
    </article>
  );
}
