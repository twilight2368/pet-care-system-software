import React, { useEffect, useState } from "react";
import AppointmentRowEditor from "../../../../components/center/staff/AppointmentRowEditor";
import { Pagination } from "antd";
import AppointmentFilter from "../../../../components/center/staff/AppointmentFilter";
import { getAppointmentToday, getUserByRole } from "../../../../apis/api";
import { toast } from "react-toastify";

export default function StaffTodayAppointmentPage() {
  const [vets, setVets] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointmentToday()
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
      <div className="flex flex-col gap-3 mb-6">
        {appointments.map((appointment) => {
          return <AppointmentRowEditor vets={vets} appointment={appointment} />;
        })}
      </div>
    </div>
  );
}
