import { useSelector } from "react-redux";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { TR, TD } from "@/components/ui/Table.jsx";
import Badge from "@/components/ui/Badge.jsx";
import { EXPENSE_TYPES } from "@/config/constants.js";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

const NATURE = Object.fromEntries(EXPENSE_TYPES.map((type) => [type.value, type]));

export default function ExpenseRow({ expense, onEdit, onDelete }) {
  const { t } = useTranslation();
  const { items: accounts } = useSelector((state) => state.account);
  const account = accounts.find((a) => a._id === expense.account);
  const nature = NATURE[expense.expenseType];

  return (
    <TR>
      <TD className="font-semibold text-slate-100">{expense.description}</TD>
      <TD>
        <Badge color="indigo">{t(expense.category)}</Badge>
      </TD>
      <TD>
        <Badge color={nature?.color || "slate"}>{t(nature?.label || expense.expenseType)}</Badge>
      </TD>
      <TD className="text-slate-400">{account?.name ?? "—"}</TD>
      <TD className="text-slate-400">
        {new Date(expense.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
      </TD>
      <TD className="font-bold text-red-400">-{formatCurrency(expense.amount, expense.currency)}</TD>
      <TD>
        <div className="flex items-center gap-2">
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
