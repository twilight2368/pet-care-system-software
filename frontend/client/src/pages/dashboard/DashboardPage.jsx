import React from "react";
import "../layout.css";
import DashboardHeaderDisplay from "../../components/dashboard/DashboardHeaderDisplay";
import UpComingAppmt from "../../components/dashboard/UpComingAppmt";
import Footer from "../../components/footers/Footer";
import GroomingServiceDisplay from "../../components/dashboard/GroomingServiceDisplay";
import HealthCheckDisplay from "../../components/dashboard/HealthCheckDisplay";
import BoardingServiceDisplay from "../../components/dashboard/BoardingServiceDisplay";
export default function DashboardPage() {
  return (
    <div className="p-3 w-full outlet-layout m-0 overflow-y-auto">
      <div className=" min-h-96 flex flex-col gap-6">
        <DashboardHeaderDisplay />

        <div className="w-full">
          <UpComingAppmt />
        </div>

        <div className=" p-3">
          <GroomingServiceDisplay />
        </div>
        <div className=" p-3">
          <HealthCheckDisplay />
        </div>
        <div className=" p-3">
          <BoardingServiceDisplay />
        </div>
        <div className="w-full pt-24">
          <Footer />
        </div>
      </div>
    </div>
  );
}
