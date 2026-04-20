import type { Plan, SiteMode } from '@/lib/site-data';
import { ModeBadge } from './ModeBadge';

export function PlanCard({ plan, mode = 'standard' }: { plan: Plan; mode?: SiteMode }) {
  return (
    <article className={`plan-card ${plan.badge ? 'featured' : ''}`}>
      {mode === 'pulse' && plan.pulseMeta ? <ModeBadge mode="pulse" text={plan.pulseMeta.syncLabel} subtle /> : null}
      {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
      <h3>{plan.name}</h3>
      <p className="plan-price">{plan.price}</p>
      {plan.annualPrice ? <p className="plan-annual">{plan.annualPrice}</p> : null}
      <p className="plan-blurb">{plan.blurb}</p>
      <p className="plan-access"><strong>Access:</strong> {plan.access}</p>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {mode === 'pulse' && plan.pulseMeta ? <p className="plan-sync-note">{plan.pulseMeta.updateWindow}</p> : null}
      <a href="/free-trial" className="button button-primary button-block">
        Choose Plan
      </a>
    </article>
  );
}
