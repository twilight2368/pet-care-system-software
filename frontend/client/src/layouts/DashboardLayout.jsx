import React from "react";
import { Outlet } from "react-router";
import DashboardHeader from "../components/headers/DashboardHeader";
import DashboardSideMenu from "../components/menus/DashboardSideMenu";
import LogoImage from "../assets/paw.png";
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
            <div className="w-full flex flex-col gap-1 justify-center items-center pt-2">
              <img src={LogoImage} alt="" className="w-6 aspect-square" />
              <div className=" text-sm logo text-gray-600 ">PawPal</div>
            </div>
          </div>
          <div className="w-5/6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
