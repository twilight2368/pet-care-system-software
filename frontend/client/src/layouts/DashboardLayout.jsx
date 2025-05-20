import React from "react";
import { Outlet } from "react-router";
import DashboardHeader from "../components/headers/DashboardHeader";
import DashboardSideMenu from "../components/menus/DashboardSideMenu";
export default function DashboardLayout() {
  return (
    <>
      <div className="w-screen h-screen">
        <div className="w-full h-16 shadow-sm">
          <DashboardHeader />
        </div>
        <div className="w-full flex flex-row ">
          <div className="w-1/6 pt-2 ">
            <DashboardSideMenu />
          </div>
          <div className="w-5/6">
            <Outlet />
            
          </div>
        </div>
      </div>
    </>
  );
}
