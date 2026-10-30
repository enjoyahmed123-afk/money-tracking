import Card from "@/components/ui/Card.jsx";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

export default function StatCard({ icon: Icon, label, value, delta, trend = "up", tone = "teal" }) {
  const toneMap = {
    teal: "from-teal-400/20 to-cyan-400/20 text-teal-300",
    indigo: "from-indigo-500/20 to-teal-400/20 text-indigo-300",
    red: "from-red-400/20 to-rose-500/20 text-red-300",
    amber: "from-amber-400/20 to-red-400/20 text-amber-300",
  };

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
        <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${toneMap[tone]}`}>
          <Icon />
        </div>
      </div>
      <div className="mt-4 text-3xl font-extrabold tracking-tight text-slate-50">{value}</div>
      {delta && (
        <div
          className={`mt-2 flex items-center gap-1 text-xs font-semibold ${
            trend === "up" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {trend === "up" ? <FiArrowUp /> : <FiArrowDown />}
          {delta}
        </div>
      )}
    </Card>
  );
}
