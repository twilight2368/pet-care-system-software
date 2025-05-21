import React from "react";
import { TbMailSpark } from "react-icons/tb";
import GroomingServiceRowDisplay from "../../../../components/center/staff/GroomingServiceRowDisplay";
export default function NewGroomingBooksPage() {
  return (
    <div className="w-full h-screen overflow-y-auto p-6">
      <div className="w-full flex flex-row gap-2 items-center logo text-2xl mb-6">
        <TbMailSpark />
        <span>New Grooming Bookings</span>
      </div>
      <div className="w-3/4 mx-auto grid grid-cols-1 gap-6 p-3 pb-20">
        <GroomingServiceRowDisplay />
        <GroomingServiceRowDisplay />
        <GroomingServiceRowDisplay />
        <GroomingServiceRowDisplay />
        <GroomingServiceRowDisplay />
        <GroomingServiceRowDisplay />
        <GroomingServiceRowDisplay />
      </div>
    </div>
  );
}
