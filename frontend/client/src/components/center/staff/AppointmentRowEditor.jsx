import React, { useState } from "react";
import { Select, Button, Typography, Tag } from "antd";
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
    <div className="flex flex-col justify-between w-full border-b border-gray-200 py-2">
      {/* Main row with all appointment details */}
      <div className="flex flex-wrap items-center w-full">
        <div className="flex items-center w-full md:w-1/5 pr-2 py-1">
          <div className="w-full">
            <Text className="text-xs text-gray-500">Pet</Text>
            <div className="font-medium">
              {pet?.id || "000"} -{pet?.name || "Unknown Pet"}
            </div>
          </div>
        </div>

        <div className="flex items-center w-1/8 pr-2 py-1">
          <div className="w-full">
            <div className="font-medium">
              <Tag
                color={
                  appointmentTypeColors[appointment.appointment_type] ||
                  "default"
                }
              >
                {appointment.appointment_type}
              </Tag>
            </div>
          </div>
        </div>

        <div className="flex items-center w-1/4 pr-2 py-1">
          <div className="w-full">
            <Text className="text-xs text-gray-500">Date & Time</Text>
            <div className="font-medium">
              {dayjs(appointment.appointment_date).format("MMM D, YYYY h:mm A")}
            </div>
          </div>
        </div>

        <div className="flex items-center w-full md:w-1/5 pr-2 py-1">
          <div className="w-full">
            <Text className="text-xs  italic text-gray-500">Veterinarian</Text>
            {editing ? (
              <Select
                value={vetId}
                onChange={setVetId}
                className="w-full"
                size="small"
              >
                {vets.map((vet) => (
                  <Option key={vet.user_id} value={vet.user_id}>
                    {vet.full_name}
                  </Option>
                ))}
              </Select>
            ) : (
              <div className="font-medium">{vetName}</div>
            )}
          </div>
        </div>

        <div className="flex items-center w-full md:w-1/5 py-1">
          <div className="flex-grow">
            {editing ? (
              <>
                {" "}
                <Text className="text-xs italic text-gray-500">Status</Text>
                <Select
                  value={status}
                  onChange={setStatus}
                  className="w-full"
                  size="small"
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
                className="font-medium"
              >
                {status}
              </Tag>
            )}
          </div>

          <div className="ml-4 flex items-center">
            {editing ? (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    setEditing(false);
                    onCancel();
                  }}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button type="primary" size="small" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button
                disabled={isEditable === false}
                size="small"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Notes section (only show if there are notes) */}
      {(appointment.notes || appointment.notes_from_client) && (
        <div className="pl-0 mt-1 mb-1 text-xs text-gray-500 w-full">
          {appointment.notes && (
            <div className="mb-1">
              <Text strong className="text-xs">
                Note:
              </Text>{" "}
              {appointment.notes}
            </div>
          )}
          {appointment.notes_from_client && (
            <div>
              <Text strong className="text-xs">
                Client Note:
              </Text>{" "}
              {appointment.notes_from_client}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
