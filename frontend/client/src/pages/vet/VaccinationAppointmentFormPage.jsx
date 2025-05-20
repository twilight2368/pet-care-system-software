import React from "react";

import VetModal from "../../components/modals/VetModal";
import VetServiceList from "../../components/vets/VetServiceList";
import "../layout.css";
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

export default function VaccinationAppointmentFormPage() {
  return (
    <div className="p-3 w-full outlet-layout m-0 overflow-y-auto">
      <div className=" mx-auto p-4 flex flex-row items-center  gap-6 ">
        <h2 className="text-2xl logo">💉 Vaccination Appointment</h2>
        <div>
          <VetModal />
        </div>
      </div>
      <div>
        <VetServiceList data={data} />
      </div>
    </div>
  );
}
