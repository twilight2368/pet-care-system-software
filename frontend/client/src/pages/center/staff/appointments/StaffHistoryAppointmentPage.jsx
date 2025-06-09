import React, { useEffect, useState } from "react";
import AppointmentRowEditor from "../../../../components/center/staff/AppointmentRowEditor";
import { Button, Pagination } from "antd";
import { toast } from "react-toastify";
import { getHistoryAppointment, getUserByRole } from "../../../../apis/api";

export default function StaffHistoryAppointmentPage() {
  const [vets, setVets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getHistoryAppointment(page - 1, size)
      .then((res) => {
        setAppointments(res.data?.content || []);
        setTotal(res.data?.page?.totalElements || 0);
      })
      .catch(() => {
        toast.error("Failed to get appointments");
      });
  }, [page, size]);

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
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center mt-4">
          <Pagination
            current={page}
            pageSize={size}
            total={total}
            showSizeChanger
            onChange={(newPage, newSize) => {
              setPage(newPage);
              setSize(newSize);
            }}
          />
        </div>
      </div>
    </div>
  );
}
