import { Outlet, Link } from "react-router-dom";
import ThemeToggle from "@/components/common/ThemeToggle.jsx";

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute right-4 top-4 z-[2]">
        <ThemeToggle />
      </div>
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-orb-float rounded-full bg-teal-400/25 blur-[90px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[26rem] w-[26rem] animate-orb-float rounded-full bg-indigo-500/25 blur-[100px] [animation-delay:-6s]" />

      <div className="relative z-[1] flex w-full max-w-md flex-col gap-6 animate-page-in">
        <Link to="/dashboard" className="flex items-center justify-center gap-3">
          <div className="grid h-12 w-12 -rotate-6 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 text-2xl font-extrabold text-[#fff] shadow-btn">
            M
          </div>
          <span className="bg-gradient-to-r from-slate-50 to-teal-400 bg-clip-text text-2xl font-extrabold text-transparent">
            MoneyFlow
          </span>
        </Link>

        <Outlet />

        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} MoneyFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
}
