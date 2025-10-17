import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 w-full lg:w-auto p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
