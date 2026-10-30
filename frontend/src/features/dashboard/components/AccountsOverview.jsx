import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { FiCreditCard } from "react-icons/fi";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const TYPE_COLOR = { bank: "bg-teal-400", wallet: "bg-indigo-400", cash: "bg-amber-400" };
const TYPE_LABEL = { bank: "Bank", wallet: "Wallet", cash: "Cash" };

export default function AccountsOverview({ accounts }) {
  const { t } = useTranslation();
  const active = accounts.filter((a) => a.isActive);

  const totalsByCurrency = {};
  for (const a of active) {
    totalsByCurrency[a.currency] = (totalsByCurrency[a.currency] ?? 0) + a.balance;
  }
  const currencies = Object.keys(totalsByCurrency);

  return (
    <Card>
      <Link to="/accounts" className="mb-4 flex items-center justify-between hover:opacity-80">
        <h3 className="font-bold text-slate-100">{t("Accounts")}</h3>
        <span className="flex items-center gap-1 text-xs font-semibold text-teal-300">
          {t("View all")} <FiArrowRight />
        </span>
      </Link>

      {active.length === 0 ? (
        <EmptyState icon={FiCreditCard} title={t("No accounts yet")} />
      ) : (
        <>
          <Link to="/accounts" className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 hover:bg-white/5">
            {currencies.map((c) => (
              <span key={c} className={`text-xl font-extrabold ${totalsByCurrency[c] < 0 ? "text-red-400" : "text-slate-50"}`}>
                {formatCurrency(totalsByCurrency[c], c)}
              </span>
            ))}
          </Link>

          <ul className="flex flex-col gap-3">
            {active.map((a) => (
              <li key={a._id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${TYPE_COLOR[a.type] || "bg-slate-400"}`} />
                  <div>
                    <div className="text-sm font-semibold text-slate-100">{a.name}</div>
                    <div className="text-[11px] text-slate-500">{t(TYPE_LABEL[a.type] || a.type)}</div>
                  </div>
                </div>
                <span className={`text-sm font-bold ${a.balance < 0 ? "text-red-400" : "text-slate-100"}`}>
                  {formatCurrency(a.balance, a.currency)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}
