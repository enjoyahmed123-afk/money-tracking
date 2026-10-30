import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "@/components/ui/Card.jsx";

const data = [
  { month: "Apr", churn: 3.2 },
  { month: "May", churn: 2.8 },
  { month: "Jun", churn: 3.6 },
  { month: "Jul", churn: 2.4 },
  { month: "Aug", churn: 2.1 },
  { month: "Sep", churn: 1.9 },
];

export default function ChurnChart() {
  return (
    <Card>
      <h3 className="mb-4 font-bold text-slate-100">Monthly Churn Rate</h3>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,255,0.08)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b76a3", fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
            <Line type="monotone" dataKey="churn" stroke="#f87171" strokeWidth={2.5} dot={{ fill: "#f87171", r: 3.5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
