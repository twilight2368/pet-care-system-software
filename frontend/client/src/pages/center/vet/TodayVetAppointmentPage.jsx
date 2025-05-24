import React from "react";
import AppointmentInfoDisplay from "../../../components/center/vet/AppointmentInfoDisplay";
import { Divider } from "antd";

export default function TodayVetAppointmentPage() {
  return (
    <div className="w-full ">
      <div className="logo text-xl p-6">Today Appointments</div>
      <div className="px-6 flex flex-col gap-3">
        <AppointmentInfoDisplay />
        <AppointmentInfoDisplay />
        <AppointmentInfoDisplay />
        <AppointmentInfoDisplay />
        <div className="py-6">
          <Divider>
            <span className="text-sm logo text-gray-500">End of list</span>
          </Divider>
        </div>
      </div>
    </div>
  );
}
