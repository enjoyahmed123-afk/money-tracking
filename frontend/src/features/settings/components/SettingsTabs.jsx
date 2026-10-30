import { NavLink } from "react-router-dom";
import { FiUser, FiShield, FiSliders } from "react-icons/fi";

const TABS = [
  { to: "/settings/profile", icon: FiUser, label: "Profile" },
  { to: "/settings/security", icon: FiShield, label: "Security" },
  { to: "/settings/appearance", icon: FiSliders, label: "Preferences" },
];

export default function SettingsTabs() {
  return (
    <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              isActive ? "bg-gradient-to-br from-teal-400 to-indigo-500 text-onaccent shadow-btn" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`
          }
        >
          <tab.icon /> {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
