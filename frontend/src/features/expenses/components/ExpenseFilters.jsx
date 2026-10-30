import { useSelector } from "react-redux";
import Select from "@/components/ui/Select.jsx";
import SearchInput from "@/components/common/SearchInput.jsx";
import DateRangeFilter from "@/components/common/DateRangeFilter.jsx";
import { DEFAULT_EXPENSE_CATEGORIES, EXPENSE_TYPES } from "@/config/constants.js";
import { useTranslation } from "@/hooks/useTranslation.js";

export default function ExpenseFilters({ filters, onChange }) {
  const { t } = useTranslation();
  const { items: customCategories } = useSelector((state) => state.expenseCategory);
  const { items: accounts } = useSelector((state) => state.account);

  const set = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <SearchInput
          placeholder={t("Search expenses...")}
          className="sm:max-w-xs"
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
        />
        <Select className="sm:w-40" value={filters.period} onChange={(e) => set({ period: e.target.value })}>
          <option value="all">{t("Time: Any")}</option>
          <option value="today">{t("Today")}</option>
          <option value="week">{t("This Week")}</option>
          <option value="month">{t("This Month")}</option>
          <option value="custom">{t("Custom")}</option>
        </Select>
        <Select className="sm:w-40" value={filters.expenseType} onChange={(e) => set({ expenseType: e.target.value })}>
          <option value="all">{t("Nature: Any")}</option>
          {EXPENSE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{t(type.label)}</option>
          ))}
        </Select>
        <Select className="sm:w-44" value={filters.category} onChange={(e) => set({ category: e.target.value })}>
          <option value="all">{t("Category: Any")}</option>
          {DEFAULT_EXPENSE_CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>{t(c.name)}</option>
          ))}
          {customCategories.map((c) => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </Select>
        <Select className="sm:w-40" value={filters.accountId} onChange={(e) => set({ accountId: e.target.value })}>
          <option value="all">{t("Account: Any")}</option>
          {accounts.map((a) => (
            <option key={a._id} value={a._id}>{a.name}</option>
          ))}
        </Select>
      </div>

      {filters.period === "custom" && (
        <DateRangeFilter
          from={filters.from}
          to={filters.to}
          onFromChange={(v) => set({ from: v })}
          onToChange={(v) => set({ to: v })}
        />
      )}
    </div>
  );
}
