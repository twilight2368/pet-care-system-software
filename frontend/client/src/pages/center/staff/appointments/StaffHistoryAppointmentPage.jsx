import React from "react";
import AppointmentRowEditor from "../../../../components/center/staff/AppointmentRowEditor";
import { Pagination } from "antd";

const vetList = [
  {
    user_id: 101,
    full_name: "Dr. Emily Carter",
  },
  {
    user_id: 102,
    full_name: "Dr. James Li",
  },
  {
    user_id: 103,
    full_name: "Dr. Priya Sharma",
  },
  {
    user_id: 104,
    full_name: "Dr. Rafael Gómez",
  },
];

export default function StaffHistoryAppointmentPage() {
  return (
    <>
      <div className="w-full p-6 ">
        <div className="logo mb-6 text-xl">Appointment history</div>
        <div className="flex flex-col gap-3 mb-6">
          <AppointmentRowEditor
            appointment={{
              appointment_id: 1,
              pet_id: 12,
              owner_id: 5,
              veterinarian_id: 102,
              appointment_date: "2025-05-21T10:00:00",
              appointment_type: "Checkup",
              status: "Pending",
              notes: "Pet needs blood test before checkup.",
              notes_from_client: "Please be gentle—pet gets anxious.",
            }}
            vets={vetList}
            onSave={(updated) => console.log("Updated appointment:", updated)}
            onCancel={() => console.log("Edit cancelled")}
            isEditable={false}
          />
          <AppointmentRowEditor
            appointment={{
              appointment_id: 1,
              pet_id: 12,
              owner_id: 5,
              veterinarian_id: 102,
              appointment_date: "2025-05-21T10:00:00",
              appointment_type: "Checkup",
              status: "Pending",
              notes: "Pet needs blood test before checkup.",
              notes_from_client: "Please be gentle—pet gets anxious.",
            }}
            vets={vetList}
            onSave={(updated) => console.log("Updated appointment:", updated)}
            onCancel={() => console.log("Edit cancelled")}
            isEditable={false}
          />
          <AppointmentRowEditor
            appointment={{
              appointment_id: 1,
              pet_id: 12,
              owner_id: 5,
              veterinarian_id: 102,
              appointment_date: "2025-05-21T10:00:00",
              appointment_type: "Checkup",
              status: "Pending",
              notes: "Pet needs blood test before checkup.",
              notes_from_client: "Please be gentle—pet gets anxious.",
            }}
            vets={vetList}
            onSave={(updated) => console.log("Updated appointment:", updated)}
            onCancel={() => console.log("Edit cancelled")}
            isEditable={false}
          />
        </div>
        <div className="w-full flex justify-center">
          <Pagination defaultCurrent={1} total={1000} />
        </div>
      </div>
    </>
  );
}
