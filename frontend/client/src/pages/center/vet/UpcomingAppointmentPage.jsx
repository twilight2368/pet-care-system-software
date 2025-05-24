import { Pagination } from "antd";
import React from "react";
import AppointmentInfoDisplay from "../../../components/center/vet/AppointmentInfoDisplay";
// Mock data — replace with actual source
const mockAppointments = [
  {
    appointment_id: 1,
    pet: {
      id: 101,
      name: "Buddy",
      owner: { full_name: "Alice Smith" },
    },
    veterinarian: { full_name: "Dr. Jane Doe" },
    appointment_type: "Checkup",
    appointment_date: "2025-05-20T10:00:00",
    status: "Completed",
    notes_from_client: "He’s been limping a bit.",
  },
  {
    appointment_id: 2,
    pet: {
      id: 102,
      name: "Max",
      owner: { full_name: "John Doe" },
    },
    veterinarian: { full_name: "Dr. John Vet" },
    appointment_type: "Vaccination",
    appointment_date: "2025-05-22T09:00:00",
    status: "Confirmed",
    notes_from_client: "",
  },
  {
    appointment_id: 3,
    pet: {
      id: 102,
      name: "Max",
      owner: { full_name: "John Doe" },
    },
    veterinarian: { full_name: "Dr. John Vet" },
    appointment_type: "Vaccination",
    appointment_date: "2025-05-22T09:00:00",
    status: "Confirmed",
    notes_from_client: "",
  },
  {
    appointment_id: 4,
    pet: {
      id: 102,
      name: "Max",
      owner: { full_name: "John Doe" },
    },
    veterinarian: { full_name: "Dr. John Vet" },
    appointment_type: "Vaccination",
    appointment_date: "2025-05-22T09:00:00",
    status: "Confirmed",
    notes_from_client: "",
  },
];

export default function UpcomingAppointmentPage() {
  return (
    <div className="p-6">
      <div className="logo text-xl mb-12">Upcoming Appointments</div>
      {/* Results */}
      <div>
        {mockAppointments.length === 0 ? (
          <Empty description="No appointments found." />
        ) : (
          <>
            {mockAppointments.map((appointment) => (
              <AppointmentInfoDisplay
                key={appointment.appointment_id}
                appointment={appointment}
                pet={appointment.pet}
                vet={appointment.veterinarian}
                onSeeDetails={() => {
                  console.log("See details for", appointment.appointment_id);
                }}
              />
            ))}
          </>
        )}{" "}
        <div className="flex justify-center items-center p-6 pb-12">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
}
