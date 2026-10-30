import { FiClock } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ReportHeader from "@/features/reports/components/ReportHeader.jsx";
import ReportPeriodControls from "@/features/reports/components/ReportPeriodControls.jsx";
import ReportSummaryRow from "@/features/reports/components/ReportSummaryRow.jsx";
import ReportCard from "@/features/reports/components/ReportCard.jsx";

const data = [
  { day: "Mon", amount: 42 },
  { day: "Tue", amount: 61 },
  { day: "Wed", amount: 38 },
  { day: "Thu", amount: 74 },
  { day: "Fri", amount: 120 },
  { day: "Sat", amount: 96 },
  { day: "Sun", amount: 55 },
];

export default function HabitsReportPage() {
  return (
    <div>
      <ReportHeader icon={FiClock} title="Spending Habits" description="Patterns in when and how you spend, day by day" actions={<ReportPeriodControls />} />

      <ReportSummaryRow
        items={[
          { label: "Highest Spend Day", value: "Friday" },
          { label: "Lowest Spend Day", value: "Wednesday" },
          { label: "Avg. Daily Spend", value: "$69" },
          { label: "Weekend Share", value: "35%" },
        ]}
      />

      <ReportCard title="Spending by Day of Week">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,255,0.08)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="amount" fill="#fbbf24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ReportCard>
    </div>
  );
}
