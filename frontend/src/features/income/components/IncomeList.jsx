import { useSelector } from "react-redux";
import { Table, THead, TBody, TR, TH } from "@/components/ui/Table.jsx";
import IncomeRow from "@/features/income/components/IncomeRow.jsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import { FiTrendingUp } from "react-icons/fi";
import { useTranslation } from "@/hooks/useTranslation.js";
import { getIncomeOccurrences } from "@/features/income/incomeUtils.js";

export default function IncomeList({ filters, onEdit, onDelete, onToggleActive }) {
  const { t } = useTranslation();
  const { items } = useSelector((state) => state.income);

  const filtered = getIncomeOccurrences(items, filters.month).filter((income) => {
    if (filters?.category && filters.category !== "all" && income.category !== filters.category) return false;
    if (filters?.recurrence && filters.recurrence !== "all" && income.recurrence !== filters.recurrence) return false;
    if (filters?.search && !income.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={FiTrendingUp}
        title={t("No income for the selected month")}
        description={t("Change the month or add a new income source.")}
      />
    );
  }

  return (
    <Table>
      <THead>
        <TR>
          <TH>{t("Source")}</TH>
          <TH>{t("Type")}</TH>
          <TH>{t("Date")}</TH>
          <TH>{t("Amount")}</TH>
          <TH>{t("Actions")}</TH>
        </TR>
      </THead>
      <TBody>
        {filtered.map((income) => (
          <IncomeRow
            key={`${income._id}-${income.receivedDate}`}
            income={income}
            onEdit={() => onEdit(income.sourceIncome)}
            onDelete={() => onDelete(income.sourceIncome)}
            onToggleActive={() => onToggleActive(income.sourceIncome)}
          />
        ))}
      </TBody>
    </Table>
  );
}

