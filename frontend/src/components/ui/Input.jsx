export default function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />}
      <input
        className={`w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-teal-400/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-teal-400/20 ${Icon ? "pl-10" : ""} ${className}`}
        {...props}
      />
    </div>
  );
}
