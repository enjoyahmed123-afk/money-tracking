import { Outlet } from "react-router-dom";
import AdminSidebar from "@/layouts/AdminLayout/components/AdminSidebar.jsx";
import AdminTopbar from "@/layouts/AdminLayout/components/AdminTopbar.jsx";

export default function AdminLayout() {
  return (
    <div className="relative flex min-h-screen">
      <div className="pointer-events-none fixed -right-24 -top-36 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[90px]" />
      <AdminSidebar />
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="mx-auto w-full max-w-[1100px] flex-1 px-5 py-7 sm:px-8 sm:py-9">
          <div className="animate-page-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
