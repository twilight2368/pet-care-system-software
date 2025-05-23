import React, { useState } from "react";
import { Select, Button, Typography, Tag, Divider } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
const { Option } = Select;
const { Text } = Typography;

const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "CheckedIn",
  "CheckedOut",
  "Cancelled",
];

// Colors for status tags
const statusColors = {
  Pending: "orange",
  Confirmed: "blue",
  Completed: "green",
  CheckedIn: "purple",
  CheckedOut: "cyan",
  Cancelled: "red",
};

// Colors for appointment types
const appointmentTypeColors = {
  Checkup: "green",
  Vaccination: "blue",
  Testing: "purple",
  Reexam: "orange",
  Other: "gray",
};

export default function AppointmentRowEditor({
  appointment,
  vets,
  pet,
  onSave,
  onCancel,
  isEditable = true,
}) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(appointment.status);
  const [vetId, setVetId] = useState(appointment.veterinarian_id);

  const handleSave = () => {
    const updated = {
      ...appointment,
      veterinarian_id: vetId,
      status,
    };
    onSave(updated);
    toast.success("Update successful");
    setEditing(false);
  };

  const vetName =
    vets.find((v) => v.user_id === appointment.veterinarian_id)?.full_name ||
    "Unknown";

  return (
    <>
      {" "}
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 mb-4">
        {/* Main row with all appointment details */}
        <div className="grid grid-cols-5 gap-6 pb-0">
          {/* Pet Details */}
          <div className="space-y-1">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div className="font-medium text-gray-800">
                  {pet?.id || "000"} - {pet?.name || "Unknown Pet"}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Owner: {pet?.owner?.full_name || "Unknown Owner"}
              </div>
            </div>
          </div>

          {/* Appointment Type */}
          <div className="space-y-1">
            <Tag
              bordered={false}
              color={
                appointmentTypeColors[appointment.appointment_type] || "default"
              }
              className="text-sm px-3 py-1 rounded-full font-medium"
            >
              {appointment.appointment_type}
            </Tag>
          </div>

          {/* Date & Time */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500">
              Date & Time
            </div>
            <div className="font-medium text-gray-800">
              {dayjs(appointment.appointment_date).format("MMM D, YYYY h:mm A")}
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
                  <Option key={vet.user_id} value={vet.user_id}>
                    {vet.full_name}
                  </Option>
                ))}
              </Select>
            ) : (
              <div className="font-medium text-gray-800">{vetName}</div>
            )}
          </div>

          {/* Status & Actions */}
          <div className="space-y-1">
            <div className="space-y-1">
              {editing ? (
                <>
                  <div className="text-xs font-semibold text-gray-500 ">
                    Status
                  </div>
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
                  color={statusColors[status] || "default"}
                  className="text-sm px-3 py-1 rounded-full font-medium"
                  bordered={false}
                >
                  {status}
                </Tag>
              )}
            </div>
          </div>
        </div>
        <Divider />
        {/* Notes section with improved styling */}

        <div className="space-y-2">
          {/* Staff Note */}
          <div className="bg-gray-50 p-3 rounded-md">
            <Text strong className="text-xs text-gray-600 block mb-1">
              Staff Note:
            </Text>
            <span className="text-sm text-gray-700">
              {appointment.notes || (
                <span className="text-gray-400 italic">No staff note</span>
              )}
            </span>
          </div>

          {/* Client Note */}
          <div className="bg-blue-50 p-3 rounded-md">
            <Text strong className="text-xs text-gray-600 block mb-1">
              Client Note:
            </Text>
            <span className="text-sm text-gray-700">
              {appointment.notes_from_client || (
                <span className="text-gray-400 italic">No client note</span>
              )}
            </span>
          </div>
        </div>

        {/* Button Editing and Save-Cancel */}
        <div className="w-full p-6 pb-3 flex justify-end space-x-2">
          {editing ? (
            <>
              <Button
                size="small"
                onClick={() => {
                  setEditing(false);
                  onCancel();
                }}
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
              disabled={isEditable === false}
              size="small"
              onClick={() => setEditing(true)}
              type="primary"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
