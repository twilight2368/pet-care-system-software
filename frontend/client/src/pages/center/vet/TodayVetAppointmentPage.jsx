import React, { useEffect, useState } from "react";
import AppointmentInfoDisplay from "../../../components/center/vet/AppointmentInfoDisplay";
import { Divider, Empty } from "antd";
import { useSelector } from "react-redux";
import { getAppointmentByVetId } from "../../../apis/api";
import { toast } from "react-toastify";

export default function TodayVetAppointmentPage() {
  const [data, setData] = useState([]);
  const user_id = useSelector((state) => state.user.user_id);
  useEffect(() => {
    getAppointmentByVetId(user_id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        toast.error("Failed to get appointments!!!");
      });
  }, [user_id]);

  return (
    <div className="w-full ">
      <div className="logo text-xl p-6">Today Appointments</div>
      <div className="px-6 flex flex-col gap-3">
        {data && data?.length ? (
          <>
            {data.map((appointment) => (
              <AppointmentInfoDisplay
                key={appointment.appointmentId}
                appointment={appointment}
              />
            ))}
          </>
        ) : (
          <>
            <Empty description="No appointments today." />
          </>
        )}
        <div className="py-6">
          <Divider>
            <span className="text-sm logo text-gray-500">End of list</span>
          </Divider>
        </div>
      </div>
    </div>
  );
}
