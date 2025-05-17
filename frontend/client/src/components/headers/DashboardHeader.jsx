import React from "react";
import LogoImage from "../../assets/paw.png";
import DashboardHeadMenu from "../menus/DashboardHeadMenu";

export default function DashboardHeader() {
  return (
    <>
      <div className="w-full flex flex-row h-full text-black">
        <div className=" w-4/5 px-8 flex flex-row items-center gap-5">
          <div className="h-full flex justify-center items-center">
            <img src={LogoImage} alt="" className="h-2/3 aspect-square" />
          </div>
          <div className=" logo text-3xl">PawPal</div>
        </div>
        <div className="w-1/5 flex items-center justify-end px-6">
          <DashboardHeadMenu />
        </div>
      </div>
    </>
  );
}
