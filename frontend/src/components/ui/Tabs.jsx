export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange?.(tab.value)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            active === tab.value
              ? "bg-gradient-to-br from-teal-400 to-indigo-500 text-onaccent shadow-btn"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          {tab.icon && <tab.icon />}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
