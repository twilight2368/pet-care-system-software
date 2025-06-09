import React, { useEffect, useState } from "react";
import AppointmentRowEditor from "../../../../components/center/staff/AppointmentRowEditor";
import { Button, Pagination } from "antd";
import { toast } from "react-toastify";
import { getAllAppointment, getUserByRole } from "../../../../apis/api";

export default function StaffAllAppointmentPage() {
  const [vets, setVets] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAllAppointment()
      .then((res) => {
        setAppointments(res.data);
      })
      .catch(() => {
        toast.error("Failed to get appointments");
      });
  }, []);

  useEffect(() => {
    getUserByRole("veterinarian".toUpperCase())
      .then((res) => {
        setVets(res.data);
      })
      .catch(() => {
        toast.error("Failed to get veterinarians");
      });
  }, []);

  return (
    <div className="w-full p-6 ">
      <div className="flex flex-col gap-3 mb-6 ">
        {appointments.map((appointment) => {
          return (
            <AppointmentRowEditor
              key={appointment.appointmentId}
              vets={vets}
              appointment={appointment}
              isEditable={false}
            />
          );
        })}
      </div>
    </div>
  );
}
