import { FiTarget, FiPlus, FiMoreVertical } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import ProgressBar from "@/components/ui/ProgressBar.jsx";
import Button from "@/components/ui/Button.jsx";

export default function SavingsGoalCard({ goal, onDeposit }) {
  const pct = Math.round((goal.saved / goal.target) * 100);
  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-teal-400/20 to-indigo-500/20 text-lg text-teal-300">
            <FiTarget />
          </div>
          <div>
            <div className="font-bold text-slate-100">{goal.name}</div>
            <div className="text-[11px] text-slate-500">Target: {goal.targetDate}</div>
          </div>
        </div>
        <button className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5">
          <FiMoreVertical className="text-xs" />
        </button>
      </div>

      <div>
        <div className="mb-1.5 flex justify-between text-sm font-bold text-slate-100">
          <span>${goal.saved.toLocaleString()}</span>
          <span className="text-slate-500">${goal.target.toLocaleString()}</span>
        </div>
        <ProgressBar value={pct} color="teal" />
      </div>

      <Button variant="outline" size="sm" icon={FiPlus} onClick={onDeposit}>
        Add Deposit
      </Button>
    </Card>
  );
}
