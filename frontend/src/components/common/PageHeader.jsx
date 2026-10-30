export default function PageHeader({ icon: Icon, title, description, actions }) {
  return (
    <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="grid h-14 w-14 -rotate-3 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-teal-400/20 to-indigo-500/20 text-2xl text-teal-300 shadow-btn">
            <Icon />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-50">{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}
