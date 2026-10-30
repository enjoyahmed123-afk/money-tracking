import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import SearchInput from "@/components/common/SearchInput.jsx";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function IncomeFilters({ filters, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        type="month"
        value={filters.month}
        onChange={(e) => onChange({ ...filters, month: e.target.value })}
        aria-label={t("Month and year")}
        className="sm:w-44"
      />
      <SearchInput
        placeholder={t("Search income sources...")}
        className="sm:max-w-xs"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />
      <Select
        className="sm:w-44"
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
      >
        <option value="all">{t("All Types")}</option>
        <option value="salary">{t("Salary")}</option>
        <option value="freelance">{t("Freelance")}</option>
        <option value="rental">{t("Rent")}</option>
        <option value="investment">{t("Profit")}</option>
        <option value="other">{t("Other")}</option>
      </Select>
      <Select
        className="sm:w-44"
        value={filters.recurrence}
        onChange={(e) => onChange({ ...filters, recurrence: e.target.value })}
      >
        <option value="all">{t("All Recurrence")}</option>
        <option value="once">{t("Once")}</option>
        <option value="weekly">{t("Weekly")}</option>
        <option value="monthly">{t("Monthly")}</option>
        <option value="yearly">{t("Yearly")}</option>
      </Select>
    </div>
  );
}
