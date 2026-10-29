export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Brand panel — desktop only */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-lg font-bold backdrop-blur-sm">
            MT
          </div>
          <span className="text-lg font-bold">Money Tracker</span>
        </div>

        <div className="relative space-y-4">
          <h2 className="text-3xl font-extrabold leading-tight">تحكّم في فلوسك بذكاء</h2>
          <p className="max-w-sm text-sm leading-relaxed text-teal-50/90">
            تابع مصاريفك وإيراداتك وحساباتك في مكان واحد، واتخذ قرارات مالية أفضل كل يوم.
          </p>
        </div>

        <p className="relative text-xs text-teal-50/70">© {new Date().getFullYear()} Money Tracker</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-10 lg:w-1/2">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">
            MT
          </div>
          <span className="text-base font-bold text-gray-900">Money Tracker</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-7 text-center lg:text-right">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
