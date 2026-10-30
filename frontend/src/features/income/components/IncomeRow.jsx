import { FiEdit2, FiTrash2, FiRepeat, FiPause, FiPlay } from "react-icons/fi";
import { TR, TD } from "@/components/ui/Table.jsx";
import Badge from "@/components/ui/Badge.jsx";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const CATEGORY_LABELS = {
  salary: "Salary",
  freelance: "Freelance",
  rental: "Rent",
  investment: "Profit",
  other: "Other",
};

const RECURRENCE_LABELS = {
  once: "Once",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
};

export default function IncomeRow({ income, onEdit, onDelete, onToggleActive }) {
  const { t } = useTranslation();
  const isRecurring = income.recurrence !== "once";

  return (
    <TR className={!income.isActive ? "opacity-50" : ""}>
      <TD className="font-semibold text-slate-100">
        <div className="flex items-center gap-2">
          {income.name}
          {isRecurring && (
            <Badge color={income.isActive ? "teal" : "slate"} icon={FiRepeat}>
              {t(RECURRENCE_LABELS[income.recurrence] ?? income.recurrence)}{!income.isActive && ` · ${t("Paused")}`}
            </Badge>
          )}
        </div>
      </TD>
      <TD>
        <Badge color="slate">{t(CATEGORY_LABELS[income.category] ?? income.category)}</Badge>
      </TD>
      <TD className="text-slate-400">
        {new Date(income.receivedDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
      </TD>
      <TD className="font-bold text-emerald-400">
        +{formatCurrency(income.amount, income.currency)}
      </TD>
      <TD>
        <div className="flex items-center gap-2">
          {isRecurring && (
            <button
              onClick={onToggleActive}
              title={income.isActive ? t("Pause recurring income") : t("Resume recurring income")}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5 hover:text-amber-300"
            >
              {income.isActive ? <FiPause className="text-xs" /> : <FiPlay className="text-xs" />}
            </button>
          )}
          <button onClick={onEdit} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5 hover:text-teal-300">
            <FiEdit2 className="text-xs" />
          </button>
          <button onClick={onDelete} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 hover:bg-red-400/10 hover:text-red-400">
            <FiTrash2 className="text-xs" />
          </button>
        </div>
      </TD>
    </TR>
  );
}
