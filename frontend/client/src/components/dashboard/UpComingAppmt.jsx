import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Card, Avatar, Empty } from "antd";
import { CalendarOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import { MdOutlinePets } from "react-icons/md";
import { FaPen, FaRegCalendarCheck } from "react-icons/fa";
import { Carousel } from "antd";
import { AppointmentTypeTag, ServiceStatusTag } from "../tags/CustomTags";
import { useSelector } from "react-redux";
import { getUserAppointmentToday } from "../../apis/api";
import { toast } from "react-toastify";
export default function UpComingAppmt() {
  const user_id = useSelector((state) => state.user.user_id);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("====================================");
    console.log(user_id);
    console.log("====================================");
    if (user_id) {
      getUserAppointmentToday(user_id)
        .then((res) => {
          setData(res.data);
          console.log("====================================");
          console.log("data", data);
          console.log("====================================");
        })
        .catch(() => {
          toast.error("Error");
        });
    }
  }, []);

  return (
    <div className="w-full mx-auto p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 logo">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FaRegCalendarCheck className="text-xl text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Upcoming Appointment
        </h2>
      </div>
      <div className="w-full">
        {data?.length ? (
          <>
            <Carousel autoplay>
              {data.map((appointment) => {
                return (
                  <>
                    <UpAppointmentCard appointment={appointment} />
                  </>
                );
              })}
            </Carousel>
          </>
        ) : (
          <>
            <Empty />
          </>
        )}
      </div>
    </div>
  );
}

function UpAppointmentCard({ appointment }) {
  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return {
      date: date.format("ddd, MMM D"), // "Thu, May 22"
      time: date.format("hh:mm A"), // "10:00 AM"
    };
  };

  const { date, time } = formatDate(appointment.appointmentDate);

  return (
    <Card variant="borderless">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar
            size={48}
            icon={<MdOutlinePets />}
            className="bg-gradient-to-r from-orange-400 to-pink-400 text-white"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {appointment.pet?.name || "Unnamed Pet"}
          </h3>
        </div>
        <div className="flex flex-row gap-6 items-center justify-center">
          <AppointmentTypeTag value={appointment.appointmentType} />
          <ServiceStatusTag value={appointment.status} />
        </div>
      </div>

      {/* Appointment Details */}
      <div className="space-y-4">
        <div className="flex flex-row gap-4 items-stretch">
          {/* Date & Time */}
          <div className="flex items-center gap-3 w-1/2 p-4 bg-blue-50 rounded-xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarOutlined className="text-blue-600 text-lg" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{date}</p>
              <p className="text-sm text-gray-600">{time}</p>
            </div>
          </div>

          {/* Veterinarian Info */}
          <div className="flex items-center gap-3 p-4 w-1/2 bg-gray-50 rounded-xl">
            <MedicineBoxOutlined className="text-gray-600 text-lg" />
            <p className="font-medium text-sm text-gray-800">
              {appointment.veterinarian?.fullName || "Unassigned Vet"}
            </p>
          </div>
        </div>

        {/* Notes from Vet */}
        {appointment.notes && (
          <div className="p-4 rounded-xl bg-green-200/20">
            <p className="text-xs text-gray-700">{appointment.notes}</p>
          </div>
        )}

        {/* Notes from Client */}
        {appointment.notesFromClient && (
          <div className="p-4 rounded-xl bg-orange-100/50">
            <div className="flex items-center gap-3 mb-2">
              <FaPen />
              <p className="text-xs font-medium">Note from you</p>
            </div>
            <p className="text-xs text-gray-800">
              {appointment.notesFromClient}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
