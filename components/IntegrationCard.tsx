export function IntegrationCard({ item }: { item: { title: string; summary: string; code: string } }) {
  return (
    <article className="integration-card">
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <pre>{item.code}</pre>
    </article>
  );
}
