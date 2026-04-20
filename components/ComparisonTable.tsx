type ComparisonRow = {
  item: string;
  standard: string;
  pulse: string;
};

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="comparison-table-wrap" role="region" aria-label="Standard versus Pulse-powered comparison">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Standard Website</th>
            <th>Pulse-Powered Website</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item}>
              <td>{row.item}</td>
              <td>{row.standard}</td>
              <td>{row.pulse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
