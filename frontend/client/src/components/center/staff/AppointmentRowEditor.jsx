import React, { useState } from "react";
import { Select, Button, Typography, Tag, Divider } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { updateAppointment } from "../../../apis/api";

const { Option } = Select;
const { Text } = Typography;

const statusOptions = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CHECKEDIN",
  "CHECKEDOUT",
  "CANCELLED",
];

const statusColors = {
  PENDING: "orange",
  CONFIRMED: "blue",
  COMPLETED: "green",
  CHECKEDIN: "purple",
  CHECKEDOUT: "cyan",
  CANCELLED: "red",
};

const appointmentTypeColors = {
  CHECKUP: "green",
  VACCINATION: "blue",
  TESTING: "purple",
  REEXAM: "orange",
  OTHER: "gray",
};

export default function AppointmentRowEditor({
  appointment,
  vets,
  isEditable = true,
}) {
  const [editing, setEditing] = useState(false);
  const [rowAppointment, setRowAppointment] = useState(appointment);
  const [status, setStatus] = useState(appointment.status);
  const [vetId, setVetId] = useState(appointment.veterinarian?.userId);

  const handleSave = () => {
    const selectedVet = vets.find((v) => v.userId === vetId);

    const updated = {
      ...rowAppointment,
      status,
      veterinarian: selectedVet,
    };

    updateAppointment(appointment.appointmentId, updated)
      .then((res) => {
        setRowAppointment(res.data);
        toast.success("Update successful");
        setEditing(false);
      })
      .catch(() => {
        toast.error(
          `Failed to update appointment ${appointment.appointmentId}`
        );
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 mb-4">
      <div className="grid grid-cols-5 gap-6 pb-0">
        {/* Pet Info */}
        <div className="space-y-1">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <div className="font-medium text-gray-800">
                <span className="text-gray-400">
                  {rowAppointment?.pet?.petId || "000"}
                </span>{" "}
                - {rowAppointment?.pet?.name || "Unknown Pet"}
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              👤: {rowAppointment?.owner?.fullName || "Unknown Owner"}
              <br />
              ☎️: {rowAppointment?.owner?.phone || "Unknown"}
              <br />
              ✉️: {rowAppointment?.owner?.email || "Unknown"}
            </div>
          </div>
        </div>

        {/* Appointment Type */}
        <div className="space-y-1">
          <Tag
            bordered={false}
            color={
              appointmentTypeColors[rowAppointment.appointmentType] || "default"
            }
            className="text-sm px-3 py-1 rounded-full font-medium"
          >
            {rowAppointment.appointmentType}
          </Tag>
        </div>

        {/* Date & Time */}
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-500">Date & Time</div>
          <div className="font-medium text-gray-800">
            {dayjs(rowAppointment.appointmentDate).add(7, "hours").format("MMM D, YYYY h:mm A")}
          </div>
        </div>

        {/* Veterinarian */}
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-500">
            Veterinarian
          </div>
          {editing ? (
            <Select
              value={vetId}
              onChange={setVetId}
              className="w-full"
              size="small"
              style={{ borderRadius: "0.375rem" }}
            >
              {vets.map((vet) => (
                <Option key={vet.userId} value={vet.userId}>
                  {vet.fullName}
                </Option>
              ))}
            </Select>
          ) : (
            <div className="font-medium text-gray-800">
              {rowAppointment?.veterinarian?.fullName || "-"}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="space-y-1">
          {editing ? (
            <>
              <div className="text-xs font-semibold text-gray-500">Status</div>
              <Select
                value={status}
                onChange={setStatus}
                className="w-40"
                size="small"
                style={{ borderRadius: "0.375rem" }}
              >
                {statusOptions.map((s) => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </>
          ) : (
            <Tag
              color={statusColors[rowAppointment.status] || "default"}
              className="text-sm px-3 py-1 rounded-full font-medium"
              bordered={false}
            >
              {rowAppointment.status}
            </Tag>
          )}
        </div>
      </div>

      <Divider />

      {/* Notes */}
      <div className="space-y-2">
        <div className="bg-gray-50 p-3 rounded-md">
          <Text strong className="text-xs text-gray-600 block mb-1">
            Staff Note:
          </Text>
          <span className="text-sm text-gray-700">
            {rowAppointment.notes || (
              <span className="text-gray-400 italic">No staff note</span>
            )}
          </span>
        </div>
        <div className="bg-blue-50 p-3 rounded-md">
          <Text strong className="text-xs text-gray-600 block mb-1">
            Client Note:
          </Text>
          <span className="text-sm text-gray-700">
            {rowAppointment.notesFromClient || (
              <span className="text-gray-400 italic">No client note</span>
            )}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full p-6 pb-3 flex justify-end space-x-2">
        {editing ? (
          <>
            <Button
              size="small"
              onClick={() => setEditing(false)}
              className="hover:bg-gray-100 text-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            disabled={!isEditable}
            size="small"
            onClick={() => setEditing(true)}
            type="primary"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}
