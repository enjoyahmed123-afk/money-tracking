import { FiDollarSign, FiAlertTriangle } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function CashBalanceCard({ account }) {
  const { t } = useTranslation();
  const balance = account?.balance ?? 0;

  return (
    <Card className="bg-gradient-to-br from-amber-400/10 to-red-400/5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t("Cash on Hand")}</span>
          <div className={`mt-2 text-4xl font-extrabold ${balance < 0 ? "text-red-400" : "text-slate-50"}`}>
            {account ? formatCurrency(balance, account.currency) : formatCurrency(0)}
          </div>
          {account && balance <= 0 && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <FiAlertTriangle /> {t("رصيد الكاش فاضي")}
            </p>
          )}
          {(!account || balance > 0) && (
            <p className="mt-1 text-xs text-slate-500">{t("Updated automatically after each entry")}</p>
          )}
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-red-400 text-2xl text-onaccent shadow-btn">
          <FiDollarSign />
        </div>
      </div>
    </Card>
  );
}
