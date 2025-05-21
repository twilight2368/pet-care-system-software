import React from "react";
import { TbMailSpark } from "react-icons/tb";
import GroomingServiceRowDisplay from "../../../../components/center/staff/GroomingServiceRowDisplay";
import { Pagination } from "antd";
import { BsCalendar2WeekFill, BsCalendar2MonthFill } from "react-icons/bs";

export default function PeriodGroomBookingPage() {
  return (
    <>
      <div className="w-full h-screen p-6 overflow-y-auto">
        <div className="w-full mb-6">
          <div className="w-full flex flex-row gap-2 items-center logo text-2xl mb-6">
            <BsCalendar2WeekFill />
            <span>Weekly Bookings</span>
          </div>
          <div className="w-3/4 mx-auto grid grid-cols-1 gap-6 p-3">
            <GroomingServiceRowDisplay />
            <GroomingServiceRowDisplay />
            <GroomingServiceRowDisplay />
            <GroomingServiceRowDisplay />
            <GroomingServiceRowDisplay />
          </div>
          <div className="w-full flex justify-center">
            <Pagination />
          </div>
        </div>
        <div className="w-full pb-20">
          <div className="w-full flex flex-row gap-2 items-center logo text-2xl mb-6">
            <BsCalendar2MonthFill />
            <span>Monthly Bookings</span>
          </div>
          <div className="w-3/4 mx-auto grid grid-cols-1 gap-6 p-3">
            <GroomingServiceRowDisplay />
            <GroomingServiceRowDisplay />
            <GroomingServiceRowDisplay />
            <GroomingServiceRowDisplay />
            <GroomingServiceRowDisplay />
          </div>
          <div className="w-full flex justify-center">
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}
