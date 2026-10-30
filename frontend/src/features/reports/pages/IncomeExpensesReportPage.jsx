import { FiTrendingUp } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ReportHeader from "@/features/reports/components/ReportHeader.jsx";
import ReportPeriodControls from "@/features/reports/components/ReportPeriodControls.jsx";
import ReportSummaryRow from "@/features/reports/components/ReportSummaryRow.jsx";
import ReportCard from "@/features/reports/components/ReportCard.jsx";
import ReportDataTable from "@/features/reports/components/ReportDataTable.jsx";

const data = [
  { month: "Apr", income: 4200, expenses: 3100 },
  { month: "May", income: 4600, expenses: 3400 },
  { month: "Jun", income: 4100, expenses: 3800 },
  { month: "Jul", income: 5200, expenses: 3600 },
  { month: "Aug", income: 4900, expenses: 4100 },
  { month: "Sep", income: 5600, expenses: 3900 },
];

export default function IncomeExpensesReportPage() {
  return (
    <div>
      <ReportHeader
        icon={FiTrendingUp}
        title="Income vs. Expenses"
        description="Compare what comes in against what goes out, month by month"
        actions={<ReportPeriodControls />}
      />

      <ReportSummaryRow
        items={[
          { label: "Total Income", value: "$28,600", tone: "text-emerald-400" },
          { label: "Total Expenses", value: "$21,900", tone: "text-red-400" },
          { label: "Net Savings", value: "$6,700", tone: "text-teal-300" },
          { label: "Avg. Monthly Net", value: "$1,117" },
        ]}
      />

      <ReportCard title="Monthly Comparison" className="mb-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,255,0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#a8b2d8" }} />
              <Bar dataKey="income" fill="#2dd4bf" radius={[6, 6, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#6366f1" radius={[6, 6, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ReportCard>

      <ReportCard title="Monthly Breakdown">
        <ReportDataTable
          columns={["Month", "Income", "Expenses", "Net"]}
          rows={data.map((d) => [d.month, `$${d.income.toLocaleString()}`, `$${d.expenses.toLocaleString()}`, `$${(d.income - d.expenses).toLocaleString()}`])}
        />
      </ReportCard>
    </div>
  );
}
