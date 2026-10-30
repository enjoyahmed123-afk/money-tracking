const COLORS = {
  teal: "from-teal-400 to-cyan-400",
  indigo: "from-indigo-500 to-teal-400",
  emerald: "from-emerald-400 to-teal-400",
  amber: "from-amber-400 to-red-400",
  red: "from-red-500 to-rose-600",
};

export default function ProgressBar({ value = 0, color = "teal", showLabel = false, className = "" }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={`w-full ${className}`}>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${COLORS[color]} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && <div className="mt-1.5 text-right text-xs font-semibold text-slate-400">{pct}%</div>}
    </div>
  );
}
