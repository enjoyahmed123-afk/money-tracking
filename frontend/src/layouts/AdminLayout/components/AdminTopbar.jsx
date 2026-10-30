import { FiLogOut } from "react-icons/fi";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-ink-950/60 px-6 py-4 backdrop-blur-xl sm:px-10">
      <div>
        <h1 className="text-lg font-extrabold text-slate-50">Admin Console</h1>
        <p className="mt-0.5 text-xs text-slate-500">Manage users, plans and platform health</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-xs font-bold text-[#fff]">
          AD
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5">
          <FiLogOut /> Log Out
        </button>
      </div>
    </header>
  );
}
