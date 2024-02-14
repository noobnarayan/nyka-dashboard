import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Analytics from "../components/Analytics";
import Dashboardcontent from "../components/Dashboardcontent";

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboardcontent />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default DashboardRoutes;
