import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/Table.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { FiClock } from "react-icons/fi";
import { formatCurrency } from "@/utils/format.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function AccountTransactionsList({ transactions, currency }) {
  const { t } = useTranslation();
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={FiClock}
        title={t("No transactions in this period")}
        description={t("Transactions from income, expenses, or manual adjustments will show up here.")}
      />
    );
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>{t("Date")}</TH>
          <TH>{t("Description")}</TH>
          <TH>{t("Amount")}</TH>
          <TH>{t("Balance After")}</TH>
        </TR>
      </THead>
      <TBody>
        {transactions.map((tx) => (
          <TR key={tx._id}>
            <TD className="text-slate-400">
              {new Date(tx.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
            </TD>
            <TD className="font-semibold text-slate-100">
              {tx.description}
              {tx.type === "adjustment" && <span className="ml-2 text-xs font-normal text-amber-400">({t("Manual adjustment")})</span>}
            </TD>
            <TD className={`font-bold ${tx.type === "debit" ? "text-red-400" : tx.type === "credit" ? "text-emerald-400" : "text-amber-400"}`}>
              {tx.type === "debit" ? "-" : tx.type === "credit" ? "+" : ""}{formatCurrency(tx.amount, currency)}
            </TD>
            <TD className="text-slate-300">{formatCurrency(tx.balanceAfter, currency)}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
