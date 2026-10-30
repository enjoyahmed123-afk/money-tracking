import { FiTarget } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ReportHeader from "@/features/reports/components/ReportHeader.jsx";
import ReportPeriodControls from "@/features/reports/components/ReportPeriodControls.jsx";
import ReportSummaryRow from "@/features/reports/components/ReportSummaryRow.jsx";
import ReportCard from "@/features/reports/components/ReportCard.jsx";

const data = [
  { month: "Apr", rate: 26 },
  { month: "May", rate: 26 },
  { month: "Jun", rate: 7 },
  { month: "Jul", rate: 31 },
  { month: "Aug", rate: 16 },
  { month: "Sep", rate: 30 },
];

export default function SavingsRatePage() {
  return (
    <div>
      <ReportHeader icon={FiTarget} title="Savings Rate" description="How much of your income you're keeping each month" actions={<ReportPeriodControls />} />

      <ReportSummaryRow
        items={[
          { label: "This Month", value: "30%", tone: "text-teal-300" },
          { label: "6-Month Avg.", value: "22.7%" },
          { label: "Best Month", value: "Jul (31%)" },
          { label: "Goal", value: "25%" },
        ]}
      />

      <ReportCard title="Savings Rate Trend">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,255,0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="rate" stroke="#34d399" strokeWidth={2.5} fill="url(#rateGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ReportCard>
    </div>
  );
}
