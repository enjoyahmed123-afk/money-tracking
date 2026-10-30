import { FiActivity } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ReportHeader from "@/features/reports/components/ReportHeader.jsx";
import ReportPeriodControls from "@/features/reports/components/ReportPeriodControls.jsx";
import ReportSummaryRow from "@/features/reports/components/ReportSummaryRow.jsx";
import ReportCard from "@/features/reports/components/ReportCard.jsx";

const data = [
  { day: "Wk 1", balance: 8100 },
  { day: "Wk 2", balance: 8600 },
  { day: "Wk 3", balance: 8300 },
  { day: "Wk 4", balance: 9420 },
];

export default function CashFlowReportPage() {
  return (
    <div>
      <ReportHeader icon={FiActivity} title="Cash Flow" description="Track the movement of money in and out over time" actions={<ReportPeriodControls />} />

      <ReportSummaryRow
        items={[
          { label: "Starting Balance", value: "$8,100" },
          { label: "Ending Balance", value: "$9,420" },
          { label: "Net Change", value: "+$1,320", tone: "text-emerald-400" },
          { label: "Best Week", value: "Wk 4" },
        ]}
      />

      <ReportCard title="Balance Over Time">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,255,0.08)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
              <Line type="monotone" dataKey="balance" stroke="#22d3ee" strokeWidth={3} dot={{ fill: "#22d3ee", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ReportCard>
    </div>
  );
}
