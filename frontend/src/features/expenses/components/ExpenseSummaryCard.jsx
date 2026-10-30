import { useSelector } from "react-redux";
import { FiTrendingDown } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import { formatCurrency } from "@/utils/format.js";
import { applyExpenseFilters } from "@/features/expenses/components/ExpenseList.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function ExpenseSummaryCard({ filters }) {
  const { t } = useTranslation();
  const { items } = useSelector((state) => state.expense);
  const filtered = applyExpenseFilters(items, filters);

  const totalsByCurrency = {};
  for (const expense of filtered) {
    totalsByCurrency[expense.currency] = (totalsByCurrency[expense.currency] ?? 0) + expense.amount;
  }
  const currencies = Object.keys(totalsByCurrency);

  return (
    <Card className="bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Total Expenses")}</span>
          {currencies.length <= 1 ? (
            <div className="mt-2 text-3xl font-extrabold text-slate-50">
              {currencies.length === 1 ? formatCurrency(totalsByCurrency[currencies[0]], currencies[0]) : formatCurrency(0)}
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              {currencies.map((c) => (
                <span key={c} className="text-2xl font-extrabold text-slate-50">
                  {formatCurrency(totalsByCurrency[c], c)}
                </span>
              ))}
            </div>
          )}
          <p className="mt-1 text-xs text-slate-500">{filtered.length} {t("expenses recorded")}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-2xl text-[#fff] shadow-btn">
          <FiTrendingDown />
        </div>
      </div>
    </Card>
  );
}
