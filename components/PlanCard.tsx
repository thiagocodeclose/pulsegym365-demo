import type { Plan } from '@/lib/site-data';

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`plan-card ${plan.badge ? 'featured' : ''}`}>
      {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
      <h3>{plan.name}</h3>
      <p className="plan-price">{plan.price}</p>
      <p className="plan-blurb">{plan.blurb}</p>
      <p className="plan-access"><strong>Access:</strong> {plan.access}</p>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <a href="/free-trial" className="button button-primary button-block">
        Choose Plan
      </a>
    </article>
  );
}
