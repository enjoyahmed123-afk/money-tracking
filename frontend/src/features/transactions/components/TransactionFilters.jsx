import Select from "@/components/ui/Select.jsx";
import SearchInput from "@/components/common/SearchInput.jsx";
import DateRangeFilter from "@/components/common/DateRangeFilter.jsx";

export default function TransactionFilters() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
      <SearchInput placeholder="Search transactions..." className="lg:max-w-xs" />
      <Select className="lg:w-40" defaultValue="all">
        <option value="all">All Accounts</option>
        <option value="main-bank">Main Bank</option>
        <option value="wallet">Vodafone Cash</option>
        <option value="cash">Cash on Hand</option>
      </Select>
      <Select className="lg:w-40" defaultValue="all">
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
        <option value="transfer">Transfer</option>
      </Select>
      <DateRangeFilter />
    </div>
  );
}
