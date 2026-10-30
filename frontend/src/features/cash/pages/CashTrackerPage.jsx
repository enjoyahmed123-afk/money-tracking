import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiDollarSign, FiArrowDownCircle } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Button from "@/components/ui/Button.jsx";
import Card from "@/components/ui/Card.jsx";
import Select from "@/components/ui/Select.jsx";
import DateRangeFilter from "@/components/common/DateRangeFilter.jsx";
import CashBalanceCard from "@/features/cash/components/CashBalanceCard.jsx";
import QuickAddCash from "@/features/cash/components/QuickAddCash.jsx";
import WithdrawalDialog from "@/features/cash/components/WithdrawalDialog.jsx";
import CashExpensesList from "@/features/cash/components/CashExpensesList.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { fetchAccounts } from "@/store/accountSlice";
import { fetchExpenses } from "@/store/expenseSlice";
import { fetchExpenseCategories } from "@/store/expenseCategorySlice";
import { DEFAULT_EXPENSE_CATEGORIES } from "@/config/constants.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const DEFAULT_FILTERS = { search: "", period: "month", expenseType: "all", category: "all", accountId: "all", from: "", to: "" };

export default function CashTrackerPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items: accounts } = useSelector((state) => state.account);
  const { items: customCategories } = useSelector((state) => state.expenseCategory);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchExpenses());
    dispatch(fetchExpenseCategories());
  }, [dispatch]);

  const cashAccount = accounts.find((a) => a.type === "cash" && a.isActive);
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <div>
      <PageHeader
        icon={FiDollarSign}
        title={t("Cash Tracker")}
        description={t("Keep tabs on physical cash on hand, separate from your bank")}
        actions={
          <Button variant="outline" icon={FiArrowDownCircle} onClick={() => setWithdrawOpen(true)} disabled={!cashAccount}>
            {t("Withdraw from Bank")}
          </Button>
        }
      />

      {!cashAccount ? (
        <EmptyState
          icon={FiDollarSign}
          title={t("No cash account yet")}
          description={t("Add an account with type 'Cash' from the Accounts page to start tracking cash on hand.")}
        />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CashBalanceCard account={cashAccount} />
            </div>
            <QuickAddCash />
          </div>

          <Card padding="p-5" className="mb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Select className="sm:w-40" value={filters.period} onChange={(e) => set({ period: e.target.value })}>
                <option value="all">{t("Time: Any")}</option>
                <option value="today">{t("Today")}</option>
                <option value="week">{t("This Week")}</option>
                <option value="month">{t("This Month")}</option>
                <option value="custom">{t("Custom")}</option>
              </Select>
              <Select className="sm:w-44" value={filters.category} onChange={(e) => set({ category: e.target.value })}>
                <option value="all">{t("Category: Any")}</option>
                {DEFAULT_EXPENSE_CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>{t(c.name)}</option>
                ))}
                {customCategories.map((c) => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </Select>
              {filters.period === "custom" && (
                <DateRangeFilter from={filters.from} to={filters.to} onFromChange={(v) => set({ from: v })} onToChange={(v) => set({ to: v })} />
              )}
            </div>
          </Card>

          <h3 className="mb-4 font-bold text-slate-100">{t("Cash Expenses")}</h3>
          <CashExpensesList cashAccount={cashAccount} filters={filters} />
        </>
      )}

      <WithdrawalDialog open={withdrawOpen} onClose={() => setWithdrawOpen(false)} cashAccount={cashAccount} />
    </div>
  );
}
