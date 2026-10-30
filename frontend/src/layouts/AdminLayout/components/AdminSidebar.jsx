import { NavLink } from "react-router-dom";
import { FiShield, FiGrid, FiUsers } from "react-icons/fi";

const ITEMS = [
  { to: "/admin/dashboard", icon: FiGrid, label: "Dashboard" },
  { to: "/admin/users", icon: FiUsers, label: "Users" },
];

export default function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-6 border-r border-white/10 bg-gradient-to-b from-[#181122] to-ink-900/50 px-4 py-6 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-[#fff] shadow-btn">
          <FiShield />
        </div>
        <div>
          <div className="text-base font-extrabold text-slate-50">Admin Panel</div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">MoneyFlow</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-[#fff] shadow-btn"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              }`
            }
          >
            <item.icon /> {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
