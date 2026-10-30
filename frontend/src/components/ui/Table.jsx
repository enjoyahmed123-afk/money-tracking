export function Table({ children, className = "" }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className={`w-full min-w-[560px] border-collapse text-left text-sm ${className}`}>{children}</table>
    </div>
  );
}

export function THead({ children }) {
  return <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-slate-400">{children}</thead>;
}

export function TBody({ children }) {
  return <tbody className="divide-y divide-white/5">{children}</tbody>;
}

export function TR({ children, className = "" }) {
  return <tr className={`transition-colors hover:bg-white/[0.03] ${className}`}>{children}</tr>;
}

export function TH({ children, className = "" }) {
  return <th className={`px-4 py-3 font-semibold ${className}`}>{children}</th>;
}

export function TD({ children, className = "" }) {
  return <td className={`px-4 py-3.5 text-slate-200 ${className}`}>{children}</td>;
}
