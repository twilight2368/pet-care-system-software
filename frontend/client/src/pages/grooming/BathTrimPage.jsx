import React from "react";
import "../layout.css";
import GroomingModal from "../../components/modals/GroomingModal";
import { FaBath } from "react-icons/fa6";
import GroomingServiceList from "../../components/grooming/GroomingServiceList";

const groomingData = [
  {
    grooming_id: 1,
    pet_id: 101,
    service_date: "2025-05-10T10:00:00Z",
    status: "Completed",
    is_recurring: false,
    recurrence_pattern: null,
    notes: "Pet was calm and cooperative.",
  },
  {
    grooming_id: 2,
    pet_id: 102,
    service_date: "2025-05-14T14:30:00Z",
    status: "Pending",
    is_recurring: true,
    recurrence_pattern: "Weekly",
    notes: "Requested gentle shampoo due to skin sensitivity.",
  },
  {
    grooming_id: 3,
    pet_id: 101,
    service_date: "2025-05-21T09:00:00Z",
    status: "Completed",
    is_recurring: true,
    recurrence_pattern: "Monthly",
    notes: "",
  },
  {
    grooming_id: 4,
    pet_id: 103,
    service_date: "2025-05-12T11:00:00Z",
    status: "Cancelled",
    is_recurring: false,
    recurrence_pattern: null,
    notes:
      "Owner canceled due to scheduling conflict.Owner canceled due to scheduling conflict.Owner canceled due to scheduling conflict.Owner canceled due to scheduling conflict.Owner canceled due to scheduling conflict.Owner canceled due to scheduling conflict.",
  },
];

export default function BathTrimPage() {
  return (
    <div className="w-full outlet-layout m-0 overflow-y-auto p-6 ">
      <div className="w-full flex flex-row gap-6 items-center">
        <div className="flex flex-row gap-2 logo text-2xl ">
          <FaBath />
          Bathing & Trimming service
        </div>
        <div>
          <GroomingModal />
        </div>
      </div>
      <div className="w-full">
        <GroomingServiceList data={groomingData} />
      </div>
    </div>
  );
}
