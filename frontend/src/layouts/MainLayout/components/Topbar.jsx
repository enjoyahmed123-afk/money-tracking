import { useLocation } from "react-router-dom";
import UserMenu from "@/layouts/MainLayout/components/UserMenu.jsx";
import GlobalSearch from "@/layouts/MainLayout/components/GlobalSearch.jsx";
import NotificationsMenu from "@/layouts/MainLayout/components/NotificationsMenu.jsx";
import ThemeToggle from "@/components/common/ThemeToggle.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

const TITLES = {
  "/dashboard": ["Dashboard", "Your financial overview at a glance"],
  "/income": ["Income", "Track every source of money coming in"],
  "/expenses": ["Expenses", "See where your money is going"],
  "/expense-categories": ["Categories", "Organize expenses your way"],
  "/cash": ["Cash Tracker", "Keep tabs on physical cash on hand"],
  "/accounts": ["Accounts", "All your banks and wallets in one place"],
  "/transactions": ["Transactions", "Full history across every account"],
  "/savings": ["Savings Goals", "Save with purpose"],
  "/debts": ["Debts", "Stay on top of what you owe"],
  "/reports": ["Reports", "Deep dive into your finances"],
  "/settings": ["Settings", "Manage your account"],
  "/subscription": ["Subscription", "Manage your plan"],
};

export default function Topbar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const match = Object.keys(TITLES).find((key) => pathname.startsWith(key));
  const [title, subtitle] = TITLES[match] || ["MoneyFlow", "Welcome back"];

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-ink-950/60 px-6 py-4 backdrop-blur-xl sm:px-10">
      <div>
        <h1 className="text-lg font-extrabold text-slate-50 sm:text-xl">{t(title)}</h1>
        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{t(subtitle)}</p>
      </div>
      <div className="flex items-center gap-3">
        <GlobalSearch />
        <ThemeToggle />
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}
