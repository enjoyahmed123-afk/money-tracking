import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";
import Badge from "@/components/ui/Badge.jsx";
import SuspendActivateButton from "@/features/admin/components/SuspendActivateButton.jsx";
import SubscriptionForm from "@/features/admin/components/SubscriptionForm.jsx";
import UserLogsList from "@/features/admin/components/UserLogsList.jsx";

export default function AdminUserDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <Link to="/admin/users" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-teal-300">
        <FiArrowLeft /> Back to Users
      </Link>

      <PageHeader
        title="Sara Ahmed"
        description={`User #${id} · sara@example.com · Joined Jan 12, 2026`}
        actions={<SuspendActivateButton />}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h3 className="mb-4 font-bold text-slate-100">Subscription</h3>
          <div className="mb-4 flex items-center gap-2">
            <Badge color="teal">Pro Plan</Badge>
            <Badge color="emerald">Active</Badge>
          </div>
          <SubscriptionForm />
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="mb-4 font-bold text-slate-100">Activity Log</h3>
          <UserLogsList />
        </Card>
      </div>
    </div>
  );
}
