import { Outlet } from "react-router-dom";
import Sidebar from "@/layouts/MainLayout/components/Sidebar.jsx";
import Topbar from "@/layouts/MainLayout/components/Topbar.jsx";
import MobileNav from "@/layouts/MainLayout/components/MobileNav.jsx";
import GlobalQuickAddButton from "@/features/cash/components/GlobalQuickAddButton.jsx";

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen">
      <div className="pointer-events-none fixed -right-24 -top-36 h-96 w-96 rounded-full bg-teal-400/20 blur-[90px]" />
      <div className="pointer-events-none fixed -left-28 bottom-0 h-[26rem] w-[26rem] rounded-full bg-indigo-500/20 blur-[100px]" />

      <Sidebar />

      <div className="relative z-[1] flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="mx-auto w-full max-w-[1240px] flex-1 px-5 py-7 pb-28 sm:px-8 sm:py-9 lg:pb-9">
          <div className="animate-page-in">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNav />
      <GlobalQuickAddButton />
    </div>
  );
}
