import { FiClock } from "react-icons/fi";

export default function TrialLimitNotice({ daysLeft = 12 }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-300">
      <FiClock className="shrink-0" />
      You have {daysLeft} days left on your free trial. Upgrade anytime to keep full access.
    </div>
  );
}
