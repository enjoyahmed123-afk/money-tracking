import { FiCalendar } from "react-icons/fi";
import Input from "@/components/ui/Input.jsx";

export default function DateRangeFilter({ from, to, onFromChange, onToChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input icon={FiCalendar} type="date" defaultValue={from} onChange={(e) => onFromChange?.(e.target.value)} />
      <span className="text-xs font-semibold text-slate-500">to</span>
      <Input icon={FiCalendar} type="date" defaultValue={to} onChange={(e) => onToChange?.(e.target.value)} />
    </div>
  );
}
