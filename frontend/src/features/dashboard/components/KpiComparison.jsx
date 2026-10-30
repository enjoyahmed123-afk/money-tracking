import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import { formatCurrency } from "@/utils/format.js";
import { sumIncomeInRange } from "@/utils/incomeMath.js";
import { useTranslation } from "@/hooks/useTranslation.js";

function monthRange(year, month) {
  return { start: new Date(year, month, 1), end: new Date(year, month + 1, 0, 23, 59, 59, 999) };
}

function sumExpensesInRange(expenses, start, end) {
  return expenses
    .filter((e) => { const d = new Date(e.date); return d >= start && d <= end; })
    .reduce((sum, e) => sum + e.amount, 0);
}

export default function KpiComparison({ incomes, expenses }) {
  const { t } = useTranslation();
  const now = new Date();
  const thisMonth = monthRange(now.getFullYear(), now.getMonth());
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = monthRange(lastMonthDate.getFullYear(), lastMonthDate.getMonth());

  const rows = [
    {
      label: "Income",
      current: sumIncomeInRange(incomes, thisMonth.start, thisMonth.end),
      previous: sumIncomeInRange(incomes, lastMonth.start, lastMonth.end),
    },
    {
      label: "Expenses",
      current: sumExpensesInRange(expenses, thisMonth.start, thisMonth.end),
      previous: sumExpensesInRange(expenses, lastMonth.start, lastMonth.end),
      lowerIsBetter: true,
    },
  ];

  return (
    <Card>
      <h3 className="mb-1 font-bold text-slate-100">{t("This Month vs. Last Month")}</h3>
      <p className="mb-4 text-xs text-slate-500">{t("Comparing key totals period over period")}</p>
      <div className="flex flex-col gap-4">
        {rows.map((r) => {
          if (r.previous === 0) {
            return (
              <div key={r.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t(r.label)}</div>
                <div className="mt-1 text-lg font-extrabold text-slate-50">{formatCurrency(r.current)}</div>
                <p className="mt-1 text-[11px] text-slate-500">{t("لا يوجد بيانات للمقارنة")}</p>
              </div>
            );
          }

          const pct = (((r.current - r.previous) / r.previous) * 100).toFixed(1);
          const improved = r.lowerIsBetter ? r.current < r.previous : r.current > r.previous;

          return (
            <div key={r.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t(r.label)}</div>
                <div className="mt-1 text-lg font-extrabold text-slate-50">{formatCurrency(r.current)}</div>
                <div className="text-[11px] text-slate-500">{t("Was")} {formatCurrency(r.previous)}</div>
              </div>
              <div className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold ${
                improved ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-300"
              }`}>
                {r.current >= r.previous ? <FiArrowUp /> : <FiArrowDown />}
                {Math.abs(pct)}%
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
