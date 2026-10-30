import { Link } from "react-router-dom";
import { FiCreditCard, FiSmartphone, FiDollarSign, FiEdit3 } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import Badge from "@/components/ui/Badge.jsx";
import ArchiveAccountButton from "@/features/accounts/components/ArchiveAccountButton.jsx";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const TYPE_META = {
  Bank: { icon: FiCreditCard, tone: "from-teal-400 to-cyan-400" },
  Wallet: { icon: FiSmartphone, tone: "from-indigo-500 to-fuchsia-500" },
  Cash: { icon: FiDollarSign, tone: "from-amber-400 to-red-400" },
};

export default function AccountCard({ account, onAdjustBalance, onToggleArchive }) {
  const { t } = useTranslation();
  const meta = TYPE_META[account.type] || TYPE_META.Bank;
  const isArchived = !account.isActive;

  return (
    <Card hover className={`flex flex-col gap-4 ${isArchived ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between">
        <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${meta.tone} text-xl text-[#fff] shadow-btn`}>
          <meta.icon />
        </div>
        <div className="flex items-center gap-1.5">
          {isArchived && <Badge color="slate">{t("Archived")}</Badge>}
          <Badge color="slate">{t(account.type)}</Badge>
        </div>
      </div>
      <div>
        <div className="font-bold text-slate-100">{account.name}</div>
        <div className={`mt-1 text-2xl font-extrabold ${account.balance < 0 ? "text-red-400" : "text-slate-50"}`}>
          {formatCurrency(account.balance, account.currency)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link to={`/accounts/${account.id}`} className="flex-1 rounded-xl border border-white/10 py-2 text-center text-xs font-semibold text-slate-300 transition hover:bg-white/5">
          {t("View History")}
        </Link>
        <button onClick={onAdjustBalance} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/5" title={t("Adjust Balance")}>
          <FiEdit3 className="text-sm" />
        </button>
      </div>
      <ArchiveAccountButton isArchived={isArchived} onClick={onToggleArchive} />
    </Card>
  );
}
