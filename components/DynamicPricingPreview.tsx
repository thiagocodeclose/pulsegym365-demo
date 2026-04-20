import type { Plan, SiteMode } from '@/lib/site-data';
import { PlanCard } from './PlanCard';

export function DynamicPricingPreview({ plans, mode }: { plans: Plan[]; mode: SiteMode }) {
  return (
    <div className="plans-grid">
      {plans.map((plan) => (
        <PlanCard key={plan.name} plan={plan} mode={mode} />
      ))}
    </div>
  );
}
