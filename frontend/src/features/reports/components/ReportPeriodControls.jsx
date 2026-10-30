import { useState } from "react";
import PeriodSelector from "@/components/common/PeriodSelector.jsx";
import CustomDateRangePicker from "@/features/reports/components/CustomDateRangePicker.jsx";

export default function ReportPeriodControls() {
  const [period, setPeriod] = useState("this-month");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PeriodSelector active={period} onChange={setPeriod} />
      {period === "custom" && <CustomDateRangePicker />}
    </div>
  );
}
