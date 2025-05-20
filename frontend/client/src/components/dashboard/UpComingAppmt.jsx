import React from "react";
import { Card, Tag, Avatar, Typography } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { MdOutlinePets } from "react-icons/md";
const { Text } = Typography;
import { FaRegCalendarCheck } from "react-icons/fa";

const statusColor = {
  Pending: "orange",
  Confirmed: "blue",
  Completed: "green",
  Cancelled: "red",
};

// Mocked single upcoming appointment
const appointment = {
  appointment_id: 1,
  pet_name: "Bella",
  pet_photo: "", // fallback to default avatar
  owner_name: "John Doe",
  veterinarian_name: "Dr. Smith",
  appointment_date: "2025-05-22T10:00:00",
  appointment_type: "Checkup",
  status: "Confirmed",
  notes: "Routine annual check-up",
};

export default function UpComingAppmt() {
  return (
    <div className="w-full mx-auto p-2">
      <div className="px-3 pb-4 text-2xl logo flex flex-row gap-2 items-center">
        <FaRegCalendarCheck /> Upcoming Appointment
      </div>
      <Card
        className="rounded-2xl h-60 shadow-md"
        title={
          <div className="flex items-center gap-3">
            {appointment.pet_photo ? (
              <Avatar src={appointment.pet_photo} />
            ) : (
              <Avatar icon={<MdOutlinePets />} />
            )}
            <span>{appointment.pet_name}</span>
          </div>
        }
        extra={
          <Tag color={statusColor[appointment.status]}>
            {appointment.status}
          </Tag>
        }
      >
        <p>
          <Text strong>Owner:</Text> {appointment.owner_name}
        </p>
        <p>
          <Text strong>Vet:</Text> {appointment.veterinarian_name}
        </p>
        <p className="flex items-center">
          <CalendarOutlined className="mr-2" />
          <Text>{new Date(appointment.appointment_date).toLocaleString()}</Text>
        </p>
        <p>
          <Text strong>Type:</Text> {appointment.appointment_type}
        </p>
        <p>
          <Text type="secondary">{appointment.notes}</Text>
        </p>
      </Card>
    </div>
  );
}
