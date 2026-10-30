export default function FormField({ label, hint, error, required, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label} {required && <span className="text-red-400">*</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="text-xs text-slate-500">{hint}</span>}
      {error && <span className="text-xs font-medium text-red-400">{error}</span>}
    </label>
  );
}
