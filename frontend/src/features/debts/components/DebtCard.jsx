import { Link } from "react-router-dom";
import { FiUser, FiCalendar, FiCheckCircle } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import Badge from "@/components/ui/Badge.jsx";
import Button from "@/components/ui/Button.jsx";
import DebtProgressBar from "@/features/debts/components/DebtProgressBar.jsx";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const DAY_MS = 24 * 60 * 60 * 1000;

export default function DebtCard({ debt, onMarkPaid }) {
  const { t } = useTranslation();
  const isPaid = debt.status === "paid";
  const isOverdue = debt.status === "overdue";
  const daysToDue = debt.dueDate
    ? Math.ceil((new Date(debt.dueDate) - new Date()) / DAY_MS)
    : null;
  const isDueSoon =
    !isPaid && !isOverdue && daysToDue !== null && daysToDue <= 7;

  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05] text-slate-300">
            {isPaid ? (
              <FiCheckCircle className="text-emerald-400" />
            ) : (
              <FiUser />
            )}
          </div>
          <div>
            <div
              className={`font-bold text-slate-100 ${
                isPaid ? "line-through text-slate-500" : ""
              }`}
            >
              {debt.creditor}
            </div>
            {debt.dueDate && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <FiCalendar /> {t("Due")}{" "}
                {new Date(debt.dueDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
        {isPaid ? (
          <Badge color="emerald" icon={FiCheckCircle}>
            {t("Paid")}
          </Badge>
        ) : isOverdue ? (
          <Badge color="red">{t("Overdue")}</Badge>
        ) : isDueSoon ? (
          <Badge color="amber">{t("Due Soon")}</Badge>
        ) : (
          <Badge color="slate">{t("On Track")}</Badge>
        )}
      </div>

      <DebtProgressBar
        paid={debt.paidAmount}
        total={debt.totalAmount}
        currency={debt.currency}
      />

      <p className="text-xs text-slate-500">
        {t("Remaining")}:{" "}
        <span className="font-bold text-slate-200">
          {formatCurrency(debt.remainingAmount, debt.currency)}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <Link
          to={`/debts/${debt._id}`}
          className="flex-1 rounded-xl border border-white/10 py-2 text-center text-xs font-semibold text-slate-300 transition hover:bg-white/5"
        >
          {t("View Details")}
        </Link>
        {!isPaid && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkPaid}
            title={t("Mark as Paid")}
          >
            <FiCheckCircle />
          </Button>
        )}
      </div>
    </Card>
  );
}
