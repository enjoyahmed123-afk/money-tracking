import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "@/components/ui/Card.jsx";
import { sumIncomeInRange } from "@/utils/incomeMath.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function sumExpensesInRange(expenses, start, end) {
  return expenses
    .filter((e) => { const d = new Date(e.date); return d >= start && d <= end; })
    .reduce((sum, e) => sum + e.amount, 0);
}

function buildLastSixMonths(incomes, expenses, t) {
  const now = new Date();
  const rows = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
    rows.push({
      month: t(MONTH_NAMES[d.getMonth()]),
      income: Math.round(sumIncomeInRange(incomes, start, end)),
      expenses: Math.round(sumExpensesInRange(expenses, start, end)),
    });
  }
  return rows;
}

export default function CashFlowChart({ incomes, expenses }) {
  const { t } = useTranslation();
  const data = buildLastSixMonths(incomes, expenses, t);

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-100">{t("Cash Flow")}</h3>
          <p className="text-xs text-slate-500">{t("Income vs. expenses over the last 6 months")}</p>
        </div>
        <div className="flex gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-400" /> {t("Income")}
          </span>
          <span className="flex items-center gap-1.5 text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-indigo-400" /> {t("Expenses")}
          </span>
        </div>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,255,0.08)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "#141d3f",
                border: "1px solid rgba(148,163,255,0.2)",
                borderRadius: 12,
                fontSize: 12,
                color: "#eef2ff",
              }}
            />
            <Area type="monotone" dataKey="income" stroke="#2dd4bf" strokeWidth={2.5} fill="url(#incomeGrad)" />
            <Area type="monotone" dataKey="expenses" stroke="#6366f1" strokeWidth={2.5} fill="url(#expenseGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
