import React from "react";
import { Tag, Typography, Divider, Button } from "antd";
import dayjs from "dayjs";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router";

const { Text } = Typography;

const statusColors = {
  Pending: "orange",
  Confirmed: "blue",
  Completed: "green",
  CheckedIn: "purple",
  CheckedOut: "cyan",
  Cancelled: "red",
};

const appointmentTypeColors = {
  Checkup: "green",
  Vaccination: "blue",
  Testing: "purple",
  Reexam: "orange",
  Other: "gray",
};

export default function AppointmentInfoDisplay({ appointment, pet, vet }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 mb-4 space-y-4">
      {/* Header: Pet Info */}
      <div className="grid grid-cols-5 gap-6">
        <div>
          <div className="font-medium text-gray-800">
            {pet?.id || "000"} - {pet?.name || "Unknown Pet"}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Owner: {pet?.owner?.full_name || "Unknown Owner"}
          </div>
        </div>

        {/* Appointment Type */}
        <div>
          {" "}
          <div className="text-xs font-semibold text-gray-500">
            Appointment Type
          </div>
          <Tag
            bordered={false}
            color={
              appointmentTypeColors[appointment?.appointment_type] || "default"
            }
            className="text-sm px-3 py-1 rounded-full font-medium"
          >
            {appointment?.appointment_type}
          </Tag>
        </div>

        {/* Date & Time */}
        <div>
          <div className="text-xs font-semibold text-gray-500">Date & Time</div>
          <div className="font-medium text-gray-800">
            {appointment?.appointment_date
              ? dayjs(appointment.appointment_date).format("MMM D, YYYY h:mm A")
              : "No date set"}
          </div>
        </div>

        {/* Veterinarian */}
        <div>
          <div className="text-xs font-semibold text-gray-500">
            Veterinarian
          </div>
          <div className="font-medium text-gray-800">
            {vet?.full_name || "Unknown Vet"}
          </div>
        </div>

        {/* Status */}
        <div>
          <div className="text-xs font-semibold text-gray-500">Status</div>
          <Tag
            color={statusColors[appointment?.status] || "default"}
            className="text-sm px-3 py-1 rounded-full font-medium"
            bordered={false}
          >
            {appointment?.status}
          </Tag>
        </div>
      </div>

      <Divider />

      {/* Notes */}
      <div className="space-y-2">
        <div className="bg-blue-50 p-3 rounded-md">
          <Text strong className="text-xs text-gray-600 block mb-1">
            Client Note:
          </Text>
          <span className="text-sm text-gray-700">
            {appointment?.notes_from_client || (
              <span className="text-gray-400 italic">No client note</span>
            )}
          </span>
        </div>
      </div>

      {/* See Details Button */}
      <div className="w-full flex justify-end pt-2">
        <Button
          size="small"
          type="link"
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            navigate("/center/vet/appointments/details/" + 123);
          }}
          icon={<FaArrowRight />}
          iconPosition="end"
        >
          See Details
        </Button>
      </div>
    </div>
  );
}
