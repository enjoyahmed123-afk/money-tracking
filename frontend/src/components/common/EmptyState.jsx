export default function EmptyState({ icon: Icon, title = "Nothing here yet", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-8 py-14 text-center">
      {Icon && (
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400/15 to-indigo-500/15 text-2xl text-teal-300">
          <Icon />
        </div>
      )}
      <h3 className="text-base font-bold text-slate-100">{title}</h3>
      {description && <p className="max-w-sm text-sm text-slate-400">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
