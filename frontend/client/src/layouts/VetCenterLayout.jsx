import React from "react";
import { Outlet } from "react-router";
import VetCenterMenu from "../components/menus/VetCenterMenu";
import { Button, Divider } from "antd";
import SimpleHeader from "../components/headers/SimpleHeader";

export default function VetCenterLayout() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-row justify-between gap-2">
        <div className="w-1/6 flex flex-col justify-start items-center">
          <div className="w-full flex justify-center items-center mt-3 mb-3">
            <SimpleHeader />
          </div>
          <div className=" w-full px-1 flex justify-center mb-6">
            <VetCenterMenu />
          </div>
          <div className="w-full px-6">
            <Button className="w-full" variant="filled" color="danger">
              Logout
            </Button>
          </div>
        </div>
        <div className="w-5/6 h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
