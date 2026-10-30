import { FiZap } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import PlanCard from "@/features/subscription/components/PlanCard.jsx";
import TrialLimitNotice from "@/features/subscription/components/TrialLimitNotice.jsx";

const PLANS = [
  { name: "Free", price: 0, features: ["1 account", "Basic dashboard", "Manual entry only"], current: false },
  { name: "Pro", price: 6, featured: true, features: ["Unlimited accounts", "All reports", "Savings goals", "Priority support"], current: true },
  { name: "Business", price: 15, features: ["Everything in Pro", "Multi-currency", "Team access", "Data export"], current: false },
];

export default function SubscriptionPage() {
  return (
    <div>
      <PageHeader icon={FiZap} title="Subscription" description="Manage your plan and billing" />

      <div className="mb-6">
        <TrialLimitNotice />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
}
