import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "الرئيسية", icon: "🏠", end: true },
  { to: "/accounts", label: "الحسابات", icon: "🏦" },
];

function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar — desktop */}
      <aside className="hidden w-64 flex-col border-l border-gray-200 bg-white py-6 md:flex">
        <div className="mb-8 flex items-center gap-2 px-5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-600 font-bold text-white">
            MT
          </div>
          <span className="text-base font-bold text-gray-900">Money Tracker</span>
        </div>
        <NavLinks />
        <div className="mt-auto px-3 pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
          >
            <span className="text-lg">🚪</span>
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 right-0 flex w-64 flex-col bg-white py-6 shadow-xl">
            <div className="mb-8 flex items-center gap-2 px-5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-600 font-bold text-white">
                MT
              </div>
              <span className="text-base font-bold text-gray-900">Money Tracker</span>
            </div>
            <NavLinks onNavigate={() => setMobileOpen(false)} />
            <div className="mt-auto px-3 pt-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
              >
                <span className="text-lg">🚪</span>
                تسجيل الخروج
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:px-6">
          <button
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="القائمة"
          >
            ☰
          </button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-teal-100 text-sm font-bold text-teal-700">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                user?.name?.charAt(0) ?? "؟"
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
