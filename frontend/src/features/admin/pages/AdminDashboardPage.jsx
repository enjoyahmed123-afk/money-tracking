import { FiGrid } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import AdminStatsCards from "@/features/admin/components/AdminStatsCards.jsx";
import RevenueChart from "@/features/admin/components/RevenueChart.jsx";
import PlanDistributionChart from "@/features/admin/components/PlanDistributionChart.jsx";
import ChurnChart from "@/features/admin/components/ChurnChart.jsx";
import ConversionFunnel from "@/features/admin/components/ConversionFunnel.jsx";

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader icon={FiGrid} title="Admin Dashboard" description="Platform health and subscription metrics" />

      <div className="mb-6">
        <AdminStatsCards />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <PlanDistributionChart />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChurnChart />
        <ConversionFunnel />
      </div>
    </div>
  );
}
