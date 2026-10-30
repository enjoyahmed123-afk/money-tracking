import { useSelector } from "react-redux";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/Table.jsx";
import Badge from "@/components/ui/Badge.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { FiDollarSign } from "react-icons/fi";
import { formatCurrency } from "@/utils/format.js";
import { applyExpenseFilters } from "@/features/expenses/components/ExpenseList.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function CashExpensesList({ cashAccount, filters }) {
  const { t } = useTranslation();
  const { items } = useSelector((state) => state.expense);

  const scoped = items.filter((e) => e.account === cashAccount?._id);
  const filtered = applyExpenseFilters(scoped, filters);
  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={FiDollarSign}
        title={t("No cash expenses in this period")}
        description={t("Cash expenses you log will show up here.")}
      />
    );
  }

  return (
    <>
      <Table>
        <THead>
          <TR>
            <TH>{t("Description")}</TH>
            <TH>{t("Category")}</TH>
            <TH>{t("Date")}</TH>
            <TH>{t("Amount")}</TH>
          </TR>
        </THead>
        <TBody>
          {filtered.map((row) => (
            <TR key={row._id}>
              <TD className="font-semibold text-slate-100">{row.description}</TD>
              <TD>
                <Badge color="amber">{t(row.category)}</Badge>
              </TD>
              <TD className="text-slate-400">
                {new Date(row.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </TD>
              <TD className="font-bold text-red-400">-{formatCurrency(row.amount, row.currency)}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <div className="mt-4 flex justify-end text-sm font-bold text-slate-200">
        {t("Total")}: {formatCurrency(total, cashAccount?.currency)}
      </div>
    </>
  );
}
