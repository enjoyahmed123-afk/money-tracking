import { FiZap } from "react-icons/fi";
import Button from "@/components/ui/Button.jsx";

export default function SubscriptionBanner({
  title = "You're on the Free Trial",
  description = "Upgrade to unlock unlimited accounts, advanced reports, and priority support.",
}) {
  return (
    <div className="glass-panel flex flex-col items-start justify-between gap-4 border-teal-400/20 bg-gradient-to-br from-teal-400/10 to-indigo-500/10 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 text-lg text-onaccent shadow-btn">
          <FiZap />
        </div>
        <div>
          <h4 className="font-bold text-slate-100">{title}</h4>
          <p className="mt-0.5 text-sm text-slate-400">{description}</p>
        </div>
      </div>
      <Button size="sm" className="shrink-0">
        Upgrade Now
      </Button>
    </div>
  );
}
