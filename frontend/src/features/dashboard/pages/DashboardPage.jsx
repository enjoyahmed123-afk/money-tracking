import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiGrid, FiTrendingUp, FiTrendingDown, FiDollarSign } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import PeriodSwitcher from "@/features/dashboard/components/PeriodSwitcher.jsx";
import LanguageToggle from "@/features/dashboard/components/LanguageToggle.jsx";
import DateRangeFilter from "@/components/common/DateRangeFilter.jsx";
import StatCard from "@/features/dashboard/components/StatCard.jsx";
import CashFlowChart from "@/features/dashboard/components/CashFlowChart.jsx";
import CategoryBreakdownChart from "@/features/dashboard/components/CategoryBreakdownChart.jsx";
import AccountsOverview from "@/features/dashboard/components/AccountsOverview.jsx";
import DebtSummaryCard from "@/features/dashboard/components/DebtSummaryCard.jsx";
import RecentActivityList from "@/features/dashboard/components/RecentActivityList.jsx";
import KpiComparison from "@/features/dashboard/components/KpiComparison.jsx";
import SubscriptionBanner from "@/components/common/SubscriptionBanner.jsx";
import { fetchIncomes } from "@/store/incomeSlice";
import { fetchExpenses } from "@/store/expenseSlice";
import { fetchExpenseCategories } from "@/store/expenseCategorySlice";
import { fetchAccounts } from "@/store/accountSlice";
import { fetchDebts } from "@/store/debtSlice";
import { resolvePeriodRange } from "@/features/dashboard/utils/periodRange.js";
import { sumIncomeInRange } from "@/utils/incomeMath.js";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { items: incomes } = useSelector((state) => state.income);
  const { items: expenses } = useSelector((state) => state.expense);
  const { items: accounts } = useSelector((state) => state.account);
  const { items: debts } = useSelector((state) => state.debt);

  const [period, setPeriod] = useState("this-month");
  const [customRange, setCustomRange] = useState({ from: "", to: "" });

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchExpenses());
    dispatch(fetchExpenseCategories());
    dispatch(fetchAccounts());
    dispatch(fetchDebts());
  }, [dispatch]);

  const { start, end, label } = resolvePeriodRange(period, customRange);

  const totalIncome = sumIncomeInRange(incomes, start, end);
  const expensesInPeriod = expenses.filter((e) => {
    const d = new Date(e.date);
    return d >= start && d <= end;
  });
  const totalExpenses = expensesInPeriod.reduce((sum, e) => sum + e.amount, 0);
  const net = totalIncome - totalExpenses;

  return (
    <div>
      <PageHeader
        icon={FiGrid}
        title={`${t("Welcome back")}${user?.name ? `, ${user.name}` : ""}`}
        description={t("Here's your financial snapshot for this period")}
        actions={
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <PeriodSwitcher active={period} onChange={setPeriod} />
              <LanguageToggle />
            </div>
            {period === "custom" && (
              <DateRangeFilter
                from={customRange.from}
                to={customRange.to}
                onFromChange={(v) => setCustomRange((r) => ({ ...r, from: v }))}
                onToChange={(v) => setCustomRange((r) => ({ ...r, to: v }))}
              />
            )}
          </div>
        }
      />

      <p className="mb-6 text-sm font-semibold text-teal-300">{label}</p>

      <div className="mb-6">
        <SubscriptionBanner />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard icon={FiTrendingUp} label={t("Total Income")} value={formatCurrency(totalIncome)} tone="teal" />
        <StatCard icon={FiTrendingDown} label={t("Total Expenses")} value={formatCurrency(totalExpenses)} tone="indigo" />
        <StatCard
          icon={FiDollarSign}
          label={net >= 0 ? t("Net Surplus") : t("Net Deficit")}
          value={formatCurrency(net)}
          tone={net >= 0 ? "teal" : "red"}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CashFlowChart incomes={incomes} expenses={expenses} />
        </div>
        <CategoryBreakdownChart expenses={expensesInPeriod} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <AccountsOverview accounts={accounts} />
        <DebtSummaryCard debts={debts} />
        <KpiComparison incomes={incomes} expenses={expenses} />
      </div>

      <div className="mt-5 grid grid-cols-1">
        <RecentActivityList />
      </div>
    </div>
  );
}
