import React from "react";
import { Outlet } from "react-router";
import { Button, Divider } from "antd";
import SimpleHeader from "../components/headers/SimpleHeader";
import StaffCenterMenu from "../components/menus/StaffCenterMenu";
import AdminCenterMenu from "../components/menus/AdminCenterMenu";
export default function AdminCenterLayout() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-row justify-between gap-2">
        <div className="w-1/6 h-screen flex flex-col justify-start items-center flex-nowrap overflow-y-auto">
          <div className="w-full flex justify-center items-center mt-3 mb-3">
            <SimpleHeader />
          </div>
          <div className=" w-full px-auto mb-2">
            <AdminCenterMenu />
          </div>
          <div className="w-full px-1">
            <Button className="w-full" variant="filled" color="danger">
              Logout
            </Button>
          </div>
        </div>
        <div className="w-5/6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
