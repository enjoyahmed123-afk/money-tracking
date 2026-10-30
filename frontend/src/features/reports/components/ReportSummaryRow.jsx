export default function ReportSummaryRow({ items }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="glass-panel p-4">
          <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{item.label}</span>
          <div className={`mt-1.5 text-xl font-extrabold ${item.tone || "text-slate-50"}`}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
