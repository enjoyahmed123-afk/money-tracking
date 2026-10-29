export function Label({ children, required }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}

const fieldClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 " +
  "placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

export function Input({ className = "", ...props }) {
  return <input className={`${fieldClass} ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return (
    <select className={`${fieldClass} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className = "", ...props }) {
  return <textarea className={`${fieldClass} ${className}`} rows={3} {...props} />;
}

export function FormField({ label, required, children, hint }) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      {children}
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
