import React from "react";
import "../layout.css";
import VetServiceList from "../../components/vets/VetServiceList";
const data = [
  {
    appointment_id: 1,
    pet_id: 101,
    owner_id: 201,
    veterinarian_id: 301,
    appointment_date: "2025-05-18T10:30:00",
    appointment_type: "Vaccination",
    status: "Pending",
    notes: "Annual rabies shot",
  },
  {
    appointment_id: 2,
    pet_id: 102,
    owner_id: 202,
    veterinarian_id: 302,
    appointment_date: "2025-05-20T14:00:00",
    appointment_type: "Checkup",
    status: "Completed",
    notes: "Regular health check",
  },
];

export default function AppointmentAllPage() {
  return (
    <div className="p-3 w-full outlet-layout m-0 overflow-y-auto">
      <div className=" mx-auto p-4 flex justify-center items-center ">
        <h2 className="text-2xl logo font-bold">🏥 My appointments </h2>
      </div>
      <div>
        <VetServiceList data={data} />
      </div>
    </div>
  );
}
