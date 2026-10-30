import { FiUsers, FiDollarSign, FiUserCheck, FiTrendingUp } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";

const STATS = [
  { icon: FiUsers, label: "Total Users", value: "4,218", tone: "from-fuchsia-500/20 to-indigo-500/20 text-fuchsia-300" },
  { icon: FiUserCheck, label: "Active Subscribers", value: "1,092", tone: "from-teal-400/20 to-cyan-400/20 text-teal-300" },
  { icon: FiDollarSign, label: "MRR", value: "$6,552", tone: "from-emerald-400/20 to-teal-400/20 text-emerald-300" },
  { icon: FiTrendingUp, label: "Growth (MoM)", value: "+8.4%", tone: "from-amber-400/20 to-red-400/20 text-amber-300" },
];

export default function AdminStatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((s) => (
        <Card key={s.label} hover>
          <div className={`mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.tone}`}>
            <s.icon />
          </div>
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{s.label}</span>
          <div className="mt-1 text-2xl font-extrabold text-slate-50">{s.value}</div>
        </Card>
      ))}
    </div>
  );
}
