import { FiUsers } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";
import Card from "@/components/ui/Card.jsx";
import UserFilters from "@/features/admin/components/UserFilters.jsx";
import UserTable from "@/features/admin/components/UserTable.jsx";
import Pagination from "@/components/common/Pagination.jsx";
import { useState } from "react";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <PageHeader icon={FiUsers} title="Users" description="4,218 total registered users" />

      <Card padding="p-5" className="mb-5">
        <UserFilters />
      </Card>

      <UserTable />

      <div className="mt-5">
        <Pagination page={page} totalPages={6} onChange={setPage} />
      </div>
    </div>
  );
}
