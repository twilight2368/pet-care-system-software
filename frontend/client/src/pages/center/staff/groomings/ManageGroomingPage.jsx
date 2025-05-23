import React from "react";
import { Calendar } from "antd";
import GroomingServiceRowDisplay from "../../../../components/center/staff/GroomingServiceRowDisplay";
export default function ManageGroomingPage() {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <div className="w-full  flex flex-row gap-2 items-start">
      <div className="w-1/4 h-full">
        <div className="logo text-xl p-6 mb-3">Grooming bookings</div>
        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto">
        <div className=" grid grid-cols-1 gap-6 px-6 pt-6 pb-20">
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
          <GroomingServiceRowDisplay />
        </div>
      </div>
    </div>
  );
}
