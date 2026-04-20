type FeatureStateCardProps = {
  label: string;
  standard: string;
  pulse: string;
};

export function FeatureStateCard({ label, standard, pulse }: FeatureStateCardProps) {
  return (
    <article className="feature-state-card">
      <h3>{label}</h3>
      <div className="feature-state-grid">
        <div>
          <span className="feature-state-title">Standard Website</span>
          <p>{standard}</p>
        </div>
        <div>
          <span className="feature-state-title pulse">Pulse-Powered</span>
          <p>{pulse}</p>
        </div>
      </div>
    </article>
  );
}
