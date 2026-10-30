import {
  FiGrid,
  FiTrendingUp,
  FiTrendingDown,
  FiTag,
  FiCreditCard,
  FiDollarSign,
  FiList,
  FiAlertCircle,
  FiPieChart,
  FiBarChart2,
  FiTarget,
} from "react-icons/fi";
import SidebarItem from "@/layouts/MainLayout/components/SidebarItem.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/dashboard", icon: FiGrid, label: "Dashboard" }],
  },
  {
    label: "Money Flow",
    items: [
      { to: "/income", icon: FiTrendingUp, label: "Income" },
      { to: "/expenses", icon: FiTrendingDown, label: "Expenses" },
      { to: "/expense-categories", icon: FiTag, label: "Categories" },
      { to: "/cash", icon: FiDollarSign, label: "Cash" },
    ],
  },
  {
    label: "Wallet",
    items: [
      { to: "/accounts", icon: FiCreditCard, label: "Accounts" },
      { to: "/transactions", icon: FiList, label: "Transactions" },
      { to: "/savings", icon: FiTarget, label: "Savings Goals" },
      { to: "/debts", icon: FiAlertCircle, label: "Debts" },
    ],
  },
  {
    label: "Insights",
    items: [
      { to: "/reports", icon: FiPieChart, label: "Reports" },
      { to: "/subscription", icon: FiBarChart2, label: "Subscription" },
    ],
  },
];

export default function Sidebar() {
  const { t } = useTranslation();
  return (
    <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-white/10 bg-gradient-to-b from-ink-800/70 to-ink-900/50 px-4 py-6 shadow-nav backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 -rotate-6 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 text-xl font-extrabold text-[#fff] shadow-btn">
          M
        </div>
        <div>
          <div className="bg-gradient-to-r from-slate-50 to-teal-400 bg-clip-text text-lg font-extrabold text-transparent">
            MoneyFlow
          </div>
          <div className="text-[10.5px] font-semibold uppercase tracking-widest text-slate-500">
            {t("Personal Finance")}
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-1.5">
            <span className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              {t(group.label)}
            </span>
            {group.items.map((item) => (
              <SidebarItem key={item.to} {...item} />
            ))}
          </div>
        ))}
      </nav>

      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-teal-400/10 to-indigo-500/10 p-3.5">
        <p className="text-xs leading-relaxed text-slate-400">
          {t("Track every dollar.")} <span className="font-semibold text-slate-200">{t("Free Trial")}</span> — {t("12 days left.")}
        </p>
      </div>
    </aside>
  );
}
