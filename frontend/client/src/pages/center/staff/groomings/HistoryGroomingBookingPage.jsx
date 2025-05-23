import React from "react";
import { Calendar, Pagination } from "antd";
import GroomingServiceRowDisplay from "../../../../components/center/staff/GroomingServiceRowDisplay";
import { FaHistory } from "react-icons/fa";
import GroomingServiceFilterForm from "../../../../components/center/staff/GroomingServiceFilterForm";

export default function HistoryGroomingBookingPage() {
  return (
    <div className="w-full flex flex-row gap-2 items-start">
      <div className="w-1/4 h-full">
        <div className="logo flex flex-row items-center gap-2 text-xl p-6 mb-3">
          <FaHistory />
          History bookings
        </div>
        <div className="w-full px-6">
          <GroomingServiceFilterForm
            staffList={[]}
            onFilter={(filters) => {
              console.log("Filter values:", filters);
              // You can apply filtering logic here
            }}
          />
        </div>
      </div>
      <div className="w-3/4 h-screen overflow-y-auto">
        <div className=" grid grid-cols-1 gap-6 px-6 pt-6 pb-12">
          <GroomingServiceRowDisplay isDisabled={true} />
          <GroomingServiceRowDisplay isDisabled={true} />
          <GroomingServiceRowDisplay isDisabled={true} />
          <GroomingServiceRowDisplay isDisabled={true} />
          <GroomingServiceRowDisplay isDisabled={true} />
        </div>
        <div className="flex justify-center pb-12">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
}
