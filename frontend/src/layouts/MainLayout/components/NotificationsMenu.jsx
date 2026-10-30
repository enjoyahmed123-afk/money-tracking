import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBell, FiAlertTriangle, FiClock, FiDollarSign } from "react-icons/fi";
import { fetchDebts } from "@/store/debtSlice";
import { fetchAccounts } from "@/store/accountSlice";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const DAY_MS = 24 * 60 * 60 * 1000;

function buildAlerts(debts, accounts, t) {
  const alerts = [];

  for (const d of debts) {
    if (d.status === "overdue") {
      alerts.push({
        id: `debt-overdue-${d._id}`,
        icon: FiAlertTriangle,
        tone: "text-red-400",
        text: `${t("Overdue debt")}: ${d.creditor} — ${formatCurrency(d.remainingAmount, d.currency)}`,
        to: `/debts/${d._id}`,
      });
    } else if (d.status === "active" && d.dueDate) {
      const daysLeft = Math.ceil((new Date(d.dueDate) - new Date()) / DAY_MS);
      if (daysLeft >= 0 && daysLeft <= 7) {
        alerts.push({
          id: `debt-soon-${d._id}`,
          icon: FiClock,
          tone: "text-amber-400",
          text: `${t("Debt due soon")}: ${d.creditor} — ${t("in")} ${daysLeft} ${t("days")}`,
          to: `/debts/${d._id}`,
        });
      }
    }
  }

  for (const a of accounts) {
    if (a.isActive && a.type === "cash" && a.balance <= 0) {
      alerts.push({
        id: `cash-empty-${a._id}`,
        icon: FiDollarSign,
        tone: "text-amber-400",
        text: `${t("Cash balance is empty")}: ${a.name}`,
        to: "/cash",
      });
    }
  }

  return alerts;
}

export default function NotificationsMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { items: debts } = useSelector((state) => state.debt);
  const { items: accounts } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchDebts());
    dispatch(fetchAccounts());
  }, [dispatch]);

  const alerts = buildAlerts(debts, accounts, t);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-slate-100"
      >
        <FiBell />
        {alerts.length > 0 && (
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-400 px-1 text-[10px] font-bold text-onaccent">
            {alerts.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <button type="button" className="fixed inset-0 z-30 cursor-default" onClick={() => setOpen(false)} aria-label="Close notifications" />
          <div className="absolute right-0 z-40 mt-2 w-80 overflow-hidden rounded-xl border border-white/10 bg-ink-800/95 p-1.5 shadow-card backdrop-blur-xl animate-page-in">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">{t("Notifications")}</div>
            {alerts.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-slate-400">{t("No alerts right now")} 🎉</p>
            ) : (
              alerts.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => { setOpen(false); navigate(a.to); }}
                  className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-200 hover:bg-white/5"
                >
                  <a.icon className={`mt-0.5 shrink-0 ${a.tone}`} />
                  <span>{a.text}</span>
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
