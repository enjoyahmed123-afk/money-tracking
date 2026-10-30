import { FiX } from "react-icons/fi";

export default function Modal({ open, onClose, title, description, children, footer, size = "md" }) {
  if (!open) return null;
  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-950/70 p-3 backdrop-blur-sm animate-page-in sm:items-center sm:p-4">
      <div className={`glass-panel my-auto max-h-[calc(100dvh-12rem)] w-full overflow-y-auto lg:max-h-[calc(100dvh-2rem)] p-2 ${sizes[size]} border-white/15`}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-lg font-bold text-slate-50">{title}</h3>}
            {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-slate-100"
          >
            <FiX />
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}



