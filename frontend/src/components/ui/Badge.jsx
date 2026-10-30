const COLORS = {
  teal: "bg-teal-400/10 text-teal-300 border-teal-400/30",
  indigo: "bg-indigo-400/10 text-indigo-300 border-indigo-400/30",
  cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
  emerald: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
  red: "bg-red-400/10 text-red-300 border-red-400/30",
  amber: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  slate: "bg-white/5 text-slate-300 border-white/10",
};

export default function Badge({ children, color = "slate", icon: Icon, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${COLORS[color]} ${className}`}
    >
      {Icon && <Icon className="text-[12px]" />}
      {children}
    </span>
  );
}
