import { Link } from "react-router-dom";
import { FiPieChart, FiTrendingUp, FiTag, FiActivity, FiTarget, FiCreditCard, FiAlertCircle, FiClock, FiArrowRight } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";

const REPORTS = [
  { to: "/reports/income-expenses", icon: FiTrendingUp, title: "Income vs. Expenses", description: "Compare what comes in against what goes out" },
  { to: "/reports/categories", icon: FiTag, title: "Category Breakdown", description: "See which categories consume most of your budget" },
  { to: "/reports/cash-flow", icon: FiActivity, title: "Cash Flow", description: "Track the movement of money over time" },
  { to: "/reports/savings-rate", icon: FiTarget, title: "Savings Rate", description: "How much of your income you're keeping" },
  { to: "/reports/net-worth", icon: FiCreditCard, title: "Net Worth", description: "Total assets across every account" },
  { to: "/reports/debts", icon: FiAlertCircle, title: "Debts Report", description: "Full picture of what you owe" },
  { to: "/reports/habits", icon: FiClock, title: "Spending Habits", description: "Patterns in when and how you spend" },
];

export default function ReportsHomePage() {
  return (
    <div>
      <PageHeader icon={FiPieChart} title="Reports" description="Deep dive into every corner of your finances" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map((report) => (
          <Link key={report.to} to={report.to}>
            <Card hover className="flex h-full flex-col gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-teal-400/20 to-indigo-500/20 text-xl text-teal-300">
                <report.icon />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-100">{report.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{report.description}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-teal-300">
                View Report <FiArrowRight />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
