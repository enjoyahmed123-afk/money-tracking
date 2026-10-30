import { useSelector } from "react-redux";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function RecentActivityList() {
  const { t } = useTranslation();
  const { items: incomes } = useSelector((state) => state.income);
  const { items: expenses } = useSelector((state) => state.expense);
  const { items: accounts } = useSelector((state) => state.account);

  const activity = [
    ...incomes.map((i) => ({
      id: `income-${i._id}`,
      label: i.name,
      date: i.receivedDate,
      amount: i.amount,
      currency: i.currency,
      account: i.account,
      icon: FiTrendingUp,
      positive: true,
    })),
    ...expenses.map((e) => ({
      id: `expense-${e._id}`,
      label: e.description,
      date: e.date,
      amount: e.amount,
      currency: e.currency,
      account: e.account,
      icon: FiTrendingDown,
      positive: false,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Card>
      <h3 className="mb-4 font-bold text-slate-100">{t("Recent Activity")}</h3>
      {activity.length === 0 ? (
        <EmptyState title={t("No activity yet")} description={t("Your latest income and expenses will show up here.")} />
      ) : (
        <ul className="flex flex-col divide-y divide-white/5">
          {activity.map((item) => {
            const account = accounts.find((a) => a._id === item.account);
            return (
              <li key={item.id} className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-slate-300">
                  <item.icon />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-100">{item.label}</div>
                  <div className="text-[11px] text-slate-500">
                    {account?.name ?? "—"} · {new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </div>
                </div>
                <span className={`shrink-0 text-sm font-bold ${item.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {item.positive ? "+" : "-"}{formatCurrency(item.amount, item.currency)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
