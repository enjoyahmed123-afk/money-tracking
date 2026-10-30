import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

// Estimates when ALL active debts will be paid off, using each debt's own
// paidAmount / time-since-start as its payment rate. Same idea as the
// per-debt prediction in DebtDetailsPage, just without fetching every
// debt's payment history (too many requests for a dashboard summary).
function estimateOverallPayoff(activeDebts) {
  const now = new Date();
  let latest = null;

  for (const d of activeDebts) {
    if (!d.startDate || d.paidAmount <= 0) continue;
    const start = new Date(d.startDate);
    const monthsElapsed = Math.max(1, (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1);
    const monthlyRate = d.paidAmount / monthsElapsed;
    if (monthlyRate <= 0) continue;

    const monthsRemaining = Math.ceil(d.remainingAmount / monthlyRate);
    const payoffDate = new Date(now.getFullYear(), now.getMonth() + monthsRemaining, now.getDate());
    if (!latest || payoffDate > latest) latest = payoffDate;
  }
  return latest;
}

export default function DebtSummaryCard({ debts }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const active = debts.filter((d) => d.status !== "paid");

  if (active.length === 0) {
    return (
      <Card hover onClick={() => navigate("/debts")} className="cursor-pointer">
        <h3 className="mb-4 font-bold text-slate-100">{t("Debts")}</h3>
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
          <FiCheckCircle /> {t("لا يوجد ديون نشطة ✅")}
        </p>
      </Card>
    );
  }

  const totalsByCurrency = {};
  for (const d of active) {
    totalsByCurrency[d.currency] = (totalsByCurrency[d.currency] ?? 0) + d.remainingAmount;
  }
  const currencies = Object.keys(totalsByCurrency);
  const hasOverdue = active.some((d) => d.status === "overdue");
  const nearestDue = active.filter((d) => d.dueDate).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
  const payoffDate = estimateOverallPayoff(active);

  return (
    <Card hover onClick={() => navigate("/debts")} className="cursor-pointer">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-slate-100">{t("Debts")}</h3>
        <FiArrowRight className="text-slate-500" />
      </div>

      {hasOverdue && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-red-400/10 px-3 py-2 text-xs font-bold text-red-300">
          <FiAlertCircle /> {t("لديك دين متأخر عن موعد السداد")}
        </div>
      )}

      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Remaining")}</span>
      <div className="mt-1 mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {currencies.map((c) => (
          <span key={c} className="text-2xl font-extrabold text-slate-50">{formatCurrency(totalsByCurrency[c], c)}</span>
        ))}
      </div>

      <div className="flex flex-col gap-1 text-xs text-slate-400">
        {nearestDue && (
          <p>
            {t("Nearest due")}:{" "}
            <span className={`font-semibold ${nearestDue.status === "overdue" ? "text-red-400" : "text-slate-200"}`}>
              {new Date(nearestDue.dueDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
            </span>
          </p>
        )}
        <p>
          {t("Expected full payoff")}:{" "}
          <span className="font-semibold text-slate-200">
            {payoffDate ? payoffDate.toLocaleDateString(undefined, { year: "numeric", month: "long" }) : t("أضف دفعات أكثر لحساب التوقع")}
          </span>
        </p>
      </div>
    </Card>
  );
}
