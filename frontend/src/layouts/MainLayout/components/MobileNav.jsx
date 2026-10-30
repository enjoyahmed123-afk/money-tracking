import { FiGrid, FiTrendingDown, FiDollarSign, FiCreditCard, FiPieChart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation.js";

const ITEMS = [
  { to: "/dashboard", icon: FiGrid, label: "Home" },
  { to: "/expenses", icon: FiTrendingDown, label: "Expenses" },
  { to: "/cash", icon: FiDollarSign, label: "Cash" },
  { to: "/accounts", icon: FiCreditCard, label: "Accounts" },
  { to: "/reports", icon: FiPieChart, label: "Reports" },
];

export default function MobileNav() {
  const { t } = useTranslation();
  return (
    <nav className="fixed inset-x-3 bottom-3 z-20 flex justify-around gap-1 rounded-2xl border border-white/15 bg-ink-900/90 p-2 shadow-nav backdrop-blur-xl lg:hidden">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10.5px] font-semibold transition ${
              isActive ? "bg-gradient-to-br from-teal-400 to-cyan-400 text-onaccent" : "text-slate-400"
            }`
          }
        >
          <item.icon className="text-lg" />
          {t(item.label)}
        </NavLink>
      ))}
    </nav>
  );
}
