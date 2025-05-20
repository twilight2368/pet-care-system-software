import React from "react";
import { Outlet } from "react-router";

export default function VetCenterLayout() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-row justify-between gap-2">
        <div className="w-1/6">ssdsd</div>
        <div className="w-5/6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
