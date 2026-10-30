import { useSelector } from "react-redux";
import { Table, THead, TBody, TR, TH } from "@/components/ui/Table.jsx";
import ExpenseRow from "@/features/expenses/components/ExpenseRow.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { FiTrendingDown } from "react-icons/fi";
import { useTranslation } from "@/hooks/useTranslation.js";

function isInPeriod(date, filters) {
  const d = new Date(date);
  const now = new Date();

  if (filters.period === "today") {
    return d.toDateString() === now.toDateString();
  }
  if (filters.period === "week") {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return d >= weekAgo && d <= now;
  }
  if (filters.period === "month") {
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  if (filters.period === "custom") {
    if (filters.from && d < new Date(filters.from)) return false;
    if (filters.to && d > new Date(`${filters.to}T23:59:59`)) return false;
    return true;
  }
  return true;
}

export function applyExpenseFilters(items, filters) {
  return items.filter((expense) => {
    if (filters.search && !expense.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.expenseType !== "all" && expense.expenseType !== filters.expenseType) return false;
    if (filters.category !== "all" && expense.category !== filters.category) return false;
    if (filters.accountId !== "all" && expense.account !== filters.accountId) return false;
    if (filters.period !== "all" && !isInPeriod(expense.date, filters)) return false;
    return true;
  });
}

export default function ExpenseList({ filters, onEdit, onDelete }) {
  const { t } = useTranslation();
  const { items } = useSelector((state) => state.expense);
  const filtered = applyExpenseFilters(items, filters);

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={FiTrendingDown}
        title={t("No expenses found")}
        description={t("Try adjusting your filters, or add your first expense.")}
      />
    );
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>{t("Description")}</TH>
          <TH>{t("Category")}</TH>
          <TH>{t("Nature")}</TH>
          <TH>{t("Account")}</TH>
          <TH>{t("Date")}</TH>
          <TH>{t("Amount")}</TH>
          <TH>{t("Actions")}</TH>
        </TR>
      </THead>
      <TBody>
        {filtered.map((expense) => (
          <ExpenseRow key={expense._id} expense={expense} onEdit={() => onEdit(expense)} onDelete={() => onDelete(expense)} />
        ))}
      </TBody>
    </Table>
  );
}
