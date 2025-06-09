import React from "react";
import { Outlet} from "react-router";
import DashboardHeader from "../components/headers/DashboardHeader";
import DashboardSideMenu from "../components/menus/DashboardSideMenu";
import LogoImage from "../assets/paw.png";
import { useSelector } from "react-redux";
import UnauthorizedPage from "../pages/unathorized/UnauthorizedPage";

export default function DashboardLayout() {
  const user = useSelector((state) => state.user.user_info);

  return (
    <>
      {user ? (
        <>
          <div className="w-screen h-screen">
            <div className="w-full h-16 shadow-sm">
              <DashboardHeader />
            </div>
            <div className="w-full flex flex-row ">
              <div className="w-1/6 pt-2 ">
                <DashboardSideMenu />
                <div className="w-full flex flex-col gap-1 justify-center items-center pt-24">
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
      ) : (
        <>
          <UnauthorizedPage />
        </>
      )}
    </>
  );
}
