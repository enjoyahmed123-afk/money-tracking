import { FiShield } from "react-icons/fi";
import Card from "@/components/ui/Card.jsx";
import AdminLoginForm from "@/features/admin/components/AdminLoginForm.jsx";

export default function AdminLoginPage() {
  return (
    <Card className="px-7 py-9 sm:px-9">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-2xl text-[#fff] shadow-btn">
          <FiShield />
        </div>
        <h2 className="text-xl font-extrabold text-slate-50">Admin Console</h2>
        <p className="mt-1.5 text-sm text-slate-400">Restricted area — authorized staff only</p>
      </div>
      <AdminLoginForm />
    </Card>
  );
}
