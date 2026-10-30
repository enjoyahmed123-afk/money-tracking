import { NavLink } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function SidebarItem({ to, icon: Icon, label, end = false }) {
  const { t } = useTranslation();
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[14.5px] font-semibold transition-all duration-200 ${
          isActive
            ? "border-transparent bg-gradient-to-br from-teal-400 to-cyan-400 text-onaccent shadow-btn"
            : "border-transparent text-slate-400 hover:translate-x-1 hover:bg-white/5 hover:text-slate-100"
        }`
      }
    >
      <Icon className="shrink-0 text-[17px]" />
      <span>{t(label)}</span>
    </NavLink>
  );
}
