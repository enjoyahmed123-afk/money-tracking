import { FiTrash2, FiArrowUpRight, FiArrowDownLeft, FiRepeat } from "react-icons/fi";
import { TR, TD } from "@/components/ui/Table.jsx";
import Badge from "@/components/ui/Badge.jsx";

const TYPE_META = {
  income: { icon: FiArrowDownLeft, color: "emerald", iconWrap: "bg-emerald-400/10 text-emerald-300" },
  expense: { icon: FiArrowUpRight, color: "red", iconWrap: "bg-red-400/10 text-red-300" },
  transfer: { icon: FiRepeat, color: "indigo", iconWrap: "bg-indigo-400/10 text-indigo-300" },
};

export default function TransactionRow({ tx, onDelete }) {
  const meta = TYPE_META[tx.type];
  return (
    <TR>
      <TD>
        <div className="flex items-center gap-2.5">
          <span className={`grid h-8 w-8 place-items-center rounded-lg ${meta.iconWrap}`}>
            <meta.icon className="text-xs" />
          </span>
          <span className="font-semibold text-slate-100">{tx.description}</span>
        </div>
      </TD>
      <TD className="text-slate-400">{tx.account}</TD>
      <TD>
        <Badge color={meta.color}>{tx.type}</Badge>
      </TD>
      <TD className="text-slate-400">{tx.date}</TD>
      <TD className={`font-bold ${tx.amount < 0 ? "text-red-400" : "text-emerald-400"}`}>
        {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </TD>
      <TD>
        <button onClick={onDelete} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 hover:bg-red-400/10 hover:text-red-400">
          <FiTrash2 className="text-xs" />
        </button>
      </TD>
    </TR>
  );
}
