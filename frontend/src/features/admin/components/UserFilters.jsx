import Select from "@/components/ui/Select.jsx";
import SearchInput from "@/components/common/SearchInput.jsx";

export default function UserFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchInput placeholder="Search by name or email..." className="sm:max-w-xs" />
      <Select className="sm:w-40" defaultValue="all">
        <option value="all">All Plans</option>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="business">Business</option>
      </Select>
      <Select className="sm:w-40" defaultValue="all">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
      </Select>
    </div>
  );
}
