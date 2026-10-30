import { useTranslation } from "@/hooks/useTranslation.js";

const PERIODS = [
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "last-3-months", label: "Last 3 Months" },
  { value: "custom", label: "Custom" },
];

export default function PeriodSelector({ active = "this-month", onChange }) {
  const { t } = useTranslation();
  return (
    <div className="inline-flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
      {PERIODS.map((p) => (
        <button
          key={p.value}
          type="button"
          onClick={() => onChange?.(p.value)}
          className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
            active === p.value
              ? "bg-gradient-to-br from-teal-400 to-indigo-500 text-onaccent shadow-btn"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          {t(p.label)}
        </button>
      ))}
    </div>
  );
}
