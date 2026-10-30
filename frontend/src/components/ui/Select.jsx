import { FiChevronDown } from "react-icons/fi";

export default function Select({ children, className = "", ...props }) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-10 text-sm text-slate-100 outline-none transition focus:border-teal-400/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-teal-400/20 [&>option]:bg-ink-800 [&>option]:text-slate-100 ${className}`}
        {...props}
      >
        {children}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
    </div>
  );
}
