import { FiTag } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import ReportHeader from "@/features/reports/components/ReportHeader.jsx";
import ReportPeriodControls from "@/features/reports/components/ReportPeriodControls.jsx";
import ReportSummaryRow from "@/features/reports/components/ReportSummaryRow.jsx";
import ReportCard from "@/features/reports/components/ReportCard.jsx";
import ReportDataTable from "@/features/reports/components/ReportDataTable.jsx";

const data = [
  { name: "Food", value: 820, color: "#2dd4bf" },
  { name: "Bills", value: 610, color: "#22d3ee" },
  { name: "Transport", value: 340, color: "#6366f1" },
  { name: "Health", value: 210, color: "#fbbf24" },
  { name: "Other", value: 180, color: "#f87171" },
];

export default function CategoryBreakdownPage() {
  return (
    <div>
      <ReportHeader icon={FiTag} title="Category Breakdown" description="See which categories consume most of your budget" actions={<ReportPeriodControls />} />

      <ReportSummaryRow
        items={[
          { label: "Top Category", value: "Food" },
          { label: "Top Spend", value: "$820" },
          { label: "Categories Used", value: "5" },
          { label: "Total Spent", value: "$2,160" },
        ]}
      />

      <ReportCard title="Spend by Category" className="mb-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,255,0.08)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#a8b2d8", fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ReportCard>

      <ReportCard title="Category Detail">
        <ReportDataTable columns={["Category", "Amount", "Share"]} rows={data.map((d) => [d.name, `$${d.value}`, `${Math.round((d.value / 2160) * 100)}%`])} />
      </ReportCard>
    </div>
  );
}
