import React from "react";
import dayjs from "dayjs";
import { Card, Tag, Avatar, Typography } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { MdOutlinePets } from "react-icons/md";
import { BiInjection, BiTestTube, BiHealth } from "react-icons/bi";
import { FaEllipsisH, FaStethoscope } from "react-icons/fa";
const { Text } = Typography;
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaPen, FaPenFancy } from "react-icons/fa6";

const statusConfig = {
  Pending: {
    color: "orange",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  Confirmed: {
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  Completed: {
    color: "green",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  CheckedIn: {
    color: "cyan",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-700",
  },
  CheckedOut: {
    color: "purple",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
  Cancelled: { color: "red", bgColor: "bg-red-50", textColor: "text-red-700" },
};

const appointmentTypeConfig = {
  Checkup: {
    icon: FaStethoscope, // Changed to FaStethoscope
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    label: "Health Checkup",
  },
  Vaccination: {
    icon: BiInjection,
    color: "text-green-600",
    bgColor: "bg-green-50",
    label: "Vaccination",
  },
  Testing: {
    icon: BiTestTube,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    label: "Laboratory Testing",
  },
  Reexam: {
    icon: BiHealth,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    label: "Re-examination",
  },
  Other: {
    icon: FaEllipsisH,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    label: "Other Services",
  },
};

// Mocked single upcoming appointment
const appointment = {
  appointment_id: 1,
  pet_name: "Bella",
  owner_name: "John Doe",
  veterinarian_name: "Dr. Smith",
  appointment_date: "2025-05-22T10:00:00",
  appointment_type: "Vaccination", // Using enum value
  status: "CheckedIn", // Using enum value
  notes: "Annual vaccination booster shot required",
  notes_from_client: "Hello world!!!",
};

export default function UpComingAppmt() {
  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return {
      date: date.format("ddd, MMM D"), // e.g., "Thu, May 22"
      time: date.format("hh:mm A"), // e.g., "10:00 AM"
    };
  };

  const { date, time } = formatDate(appointment.appointment_date);
  const statusInfo = statusConfig[appointment.status];
  const typeInfo = appointmentTypeConfig[appointment.appointment_type];
  const TypeIcon = typeInfo.icon;

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

      {/* Appointment Card */}
      <Card variant="borderless">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar
              size={48}
              icon={<MdOutlinePets />}
              className="bg-gradient-to-r from-orange-400 to-pink-400 text-white"
            />

            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {appointment.pet_name}
            </h3>
          </div>
          <div className="flex flex-row gap-6 items-center justify-center">
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded ${typeInfo.bgColor}`}>
                <TypeIcon className={`text-sm ${typeInfo.color}`} />
              </div>
              <p className="text-sm text-gray-600">{typeInfo.label}</p>
            </div>
            <Tag
              color={statusInfo.color}
              className="px-3 py-1 text-sm font-medium rounded-full mb-1"
            >
              {appointment.status}
            </Tag>
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

            {/*  Vet Info */}

            <div className="flex items-center gap-3 p-4  w-1/2  bg-gray-50 rounded-xl">
              <MedicineBoxOutlined className="text-gray-600 text-lg" />
              <p className="font-medium text-sm text-gray-800">
                {appointment.veterinarian_name}
              </p>
            </div>
          </div>

          {/* Vet */}
          <div className={`p-4 rounded-xl ${typeInfo.bgColor}`}>
            <div className="flex items-center gap-3 mb-2">
              <TypeIcon className={`${typeInfo.color}`} />
              <p className={`text-xs font-medium ${typeInfo.color}`}>
                {typeInfo.label}
              </p>
            </div>
            {appointment.notes && (
              <p className="text-xs text-gray-700">{appointment.notes}</p>
            )}
          </div>

          {/* Service Type Details */}
          <div className={`p-4 rounded-xl bg-gray-50`}>
            <div className="flex items-center gap-3 mb-2">
              <FaPen />
              <p className={`text-xs font-medium `}>Note from you</p>
            </div>
            {appointment.notes_from_client && (
              <p className="text-xs text-gray-800">
                {appointment.notes_from_client}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
