const VARIANTS = {
  primary:
    "text-onaccent bg-gradient-to-br from-teal-400 to-indigo-500 shadow-btn hover:brightness-110 border border-transparent",
  secondary:
    "text-slate-100 bg-ink-700/80 border border-indigo-300/20 hover:bg-ink-700",
  outline:
    "text-slate-200 bg-transparent border border-white/15 hover:bg-white/5",
  ghost: "text-slate-300 bg-transparent border border-transparent hover:bg-white/5",
  danger:
    "text-red-50 bg-gradient-to-br from-red-500 to-rose-600 border border-transparent hover:brightness-110",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-6 py-3.5 text-[15px] gap-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 ease-out active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {Icon && <Icon className="shrink-0" />}
      {children}
      {IconRight && <IconRight className="shrink-0" />}
    </button>
  );
}
