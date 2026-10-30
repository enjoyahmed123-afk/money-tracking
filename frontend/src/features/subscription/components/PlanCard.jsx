import { FiCheck } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";

export default function PlanCard({ plan }) {
  return (
    <Card hover className={`flex flex-col gap-5 ${plan.featured ? "border-teal-400/40 bg-gradient-to-br from-teal-400/10 to-indigo-500/10" : ""}`}>
      {plan.featured && (
        <span className="w-fit rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 px-3 py-1 text-[11px] font-bold text-onaccent">
          Most Popular
        </span>
      )}
      <div>
        <h3 className="text-lg font-extrabold text-slate-100">{plan.name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-slate-50">${plan.price}</span>
          <span className="text-sm text-slate-500">/month</span>
        </div>
      </div>
      <ul className="flex flex-1 flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
            <FiCheck className="shrink-0 text-teal-300" /> {f}
          </li>
        ))}
      </ul>
      <Button fullWidth variant={plan.featured ? "primary" : "outline"}>
        {plan.current ? "Current Plan" : "Choose Plan"}
      </Button>
    </Card>
  );
}
