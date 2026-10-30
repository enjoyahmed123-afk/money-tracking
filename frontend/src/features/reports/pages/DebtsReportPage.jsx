import { FiAlertCircle } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import ReportHeader from "@/features/reports/components/ReportHeader.jsx";
import ReportPeriodControls from "@/features/reports/components/ReportPeriodControls.jsx";
import ReportSummaryRow from "@/features/reports/components/ReportSummaryRow.jsx";
import ReportCard from "@/features/reports/components/ReportCard.jsx";
import ReportDataTable from "@/features/reports/components/ReportDataTable.jsx";

const data = [
  { name: "Ahmed Hassan", value: 2300, color: "#f87171" },
  { name: "Mona Saeed", value: 400, color: "#fbbf24" },
  { name: "Cairo Furniture Co.", value: 0, color: "#34d399" },
];

export default function DebtsReportPage() {
  return (
    <div>
      <ReportHeader icon={FiAlertCircle} title="Debts Report" description="Full picture of what you owe, across every creditor" actions={<ReportPeriodControls />} />

      <ReportSummaryRow
        items={[
          { label: "Total Remaining", value: "$2,700", tone: "text-amber-300" },
          { label: "Active Debts", value: "2" },
          { label: "Overdue", value: "1", tone: "text-red-400" },
          { label: "Paid Off", value: "1", tone: "text-emerald-400" },
        ]}
      />

      <ReportCard title="Remaining by Creditor" className="mb-6">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.filter((d) => d.value > 0)} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {data.filter((d) => d.value > 0).map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ReportCard>

      <ReportCard title="All Debts">
        <ReportDataTable
          columns={["Creditor", "Total", "Remaining", "Status"]}
          rows={[
            ["Ahmed Hassan", "$3,000", "$2,300", "Due Soon"],
            ["Mona Saeed", "$500", "$400", "Overdue"],
            ["Cairo Furniture Co.", "$1,200", "$0", "Paid"],
          ]}
        />
      </ReportCard>
    </div>
  );
}
