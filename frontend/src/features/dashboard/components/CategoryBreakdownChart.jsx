import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "@/components/ui/Card.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { FiPieChart } from "react-icons/fi";
import { formatCurrency } from "@/utils/format.js";
import { DEFAULT_EXPENSE_CATEGORIES } from "@/config/constants.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function CategoryBreakdownChart({ expenses }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items: customCategories } = useSelector((state) => state.expenseCategory);

  const colorByCategory = Object.fromEntries([
    ...DEFAULT_EXPENSE_CATEGORIES.map((c) => [c.name, c.color]),
    ...customCategories.map((c) => [c.name, c.color]),
  ]);

  const totalsByCategory = {};
  for (const e of expenses) {
    totalsByCategory[e.category] = (totalsByCategory[e.category] ?? 0) + e.amount;
  }
  const data = Object.entries(totalsByCategory)
    .map(([name, value]) => ({ name, value, color: colorByCategory[name] || "#94a3b8" }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const topThree = data.slice(0, 3);

  if (data.length === 0) {
    return (
      <Card>
        <div className="mb-4">
          <h3 className="font-bold text-slate-100">{t("Expense Breakdown")}</h3>
          <p className="text-xs text-slate-500">{t("Top spending categories for this period")}</p>
        </div>
        <EmptyState icon={FiPieChart} title={t("No expenses in this period")} />
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-4">
        <h3 className="font-bold text-slate-100">{t("Expense Breakdown")}</h3>
        <p className="text-xs text-slate-500">{t("Top spending categories for this period — click a slice to see those expenses")}</p>
      </div>
      <div className="relative h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              onClick={(entry) => navigate(`/expenses?category=${encodeURIComponent(entry.name)}`)}
              className="cursor-pointer"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [formatCurrency(value), name]}
              contentStyle={{
                background: "#141d3f",
                border: "1px solid rgba(148,163,255,0.2)",
                borderRadius: 12,
                fontSize: 12,
                color: "#eef2ff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-slate-50">{formatCurrency(total)}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{t("Total Spent")}</span>
        </div>
      </div>

      <p className="mt-4 mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">{t("Top 3 Categories")}</p>
      <ul className="grid grid-cols-1 gap-2">
        {topThree.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(`/expenses?category=${encodeURIComponent(item.name)}`)}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-white/5"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
            {t(item.name)} <span className="ml-auto font-semibold text-slate-200">{formatCurrency(item.value)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
