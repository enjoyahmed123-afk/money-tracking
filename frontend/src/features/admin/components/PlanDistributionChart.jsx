import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "@/components/ui/Card.jsx";

const data = [
  { name: "Free", value: 3126, color: "#6b76a3" },
  { name: "Pro", value: 950, color: "#2dd4bf" },
  { name: "Business", value: 142, color: "#a855f7" },
];

export default function PlanDistributionChart() {
  return (
    <Card>
      <h3 className="mb-4 font-bold text-slate-100">Plan Distribution</h3>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={80} paddingAngle={3}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "#141d3f", border: "1px solid rgba(148,163,255,0.2)", borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} /> {d.name}
            <span className="ml-auto font-semibold text-slate-200">{d.value.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
