import { FiCreditCard } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ReportHeader from "@/features/reports/components/ReportHeader.jsx";
import ReportPeriodControls from "@/features/reports/components/ReportPeriodControls.jsx";
import ReportSummaryRow from "@/features/reports/components/ReportSummaryRow.jsx";
import ReportCard from "@/features/reports/components/ReportCard.jsx";
import ReportDataTable from "@/features/reports/components/ReportDataTable.jsx";

const data = [
  { month: "Apr", worth: 6200 },
  { month: "May", worth: 7100 },
  { month: "Jun", worth: 7400 },
  { month: "Jul", worth: 8200 },
  { month: "Aug", worth: 8600 },
  { month: "Sep", worth: 8940 },
];

export default function NetWorthReportPage() {
  return (
    <div>
      <ReportHeader icon={FiCreditCard} title="Net Worth" description="Total assets across every account over time" actions={<ReportPeriodControls />} />

      <ReportSummaryRow
        items={[
          { label: "Current Net Worth", value: "$8,940", tone: "text-teal-300" },
          { label: "6-Month Growth", value: "+$2,740", tone: "text-emerald-400" },
          { label: "Bank Accounts", value: "$8,420" },
          { label: "Wallets & Cash", value: "$520" },
        ]}
      />

      <ReportCard title="Net Worth Trend" className="mb-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="worthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,255,0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="worth" stroke="#6366f1" strokeWidth={2.5} fill="url(#worthGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ReportCard>

      <ReportCard title="By Account">
        <ReportDataTable
          columns={["Account", "Type", "Balance"]}
          rows={[
            ["Main Bank", "Bank", "$8,420.50"],
            ["Vodafone Cash", "Wallet", "$640.00"],
            ["Cash on Hand", "Cash", "-$120.00"],
          ]}
        />
      </ReportCard>
    </div>
  );
}
