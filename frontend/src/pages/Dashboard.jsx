import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardRoutes from "../routes/DashboardRoutes";
function Dashboard() {
  return (
    <div className="bg-gray-50 flex">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <DashboardRoutes />
      </div>
    </div>
  );
}
export default Dashboard;
