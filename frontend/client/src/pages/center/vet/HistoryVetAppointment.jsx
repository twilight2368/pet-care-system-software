import React, { useState } from "react";
import { DatePicker, Select, Empty, Button, Space, Divider } from "antd";
import dayjs from "dayjs";
import AppointmentInfoDisplay from "../../../components/center/vet/AppointmentInfoDisplay";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock data — replace with actual source
const mockAppointments = [
  {
    appointment_id: 1,
    pet: {
      id: 101,
      name: "Buddy",
      owner: { full_name: "Alice Smith" },
    },
    veterinarian: { full_name: "Dr. Jane Doe" },
    appointment_type: "Checkup",
    appointment_date: "2025-05-20T10:00:00",
    status: "Completed",
    notes_from_client: "He’s been limping a bit.",
  },
  {
    appointment_id: 2,
    pet: {
      id: 102,
      name: "Max",
      owner: { full_name: "John Doe" },
    },
    veterinarian: { full_name: "Dr. John Vet" },
    appointment_type: "Vaccination",
    appointment_date: "2025-05-22T09:00:00",
    status: "Confirmed",
    notes_from_client: "",
  },
  {
    appointment_id: 3,
    pet: {
      id: 102,
      name: "Max",
      owner: { full_name: "John Doe" },
    },
    veterinarian: { full_name: "Dr. John Vet" },
    appointment_type: "Vaccination",
    appointment_date: "2025-05-22T09:00:00",
    status: "Confirmed",
    notes_from_client: "",
  },
  {
    appointment_id: 4,
    pet: {
      id: 102,
      name: "Max",
      owner: { full_name: "John Doe" },
    },
    veterinarian: { full_name: "Dr. John Vet" },
    appointment_type: "Vaccination",
    appointment_date: "2025-05-22T09:00:00",
    status: "Confirmed",
    notes_from_client: "",
  },
];

const appointmentTypes = [
  "Checkup",
  "Vaccination",
  "Testing",
  "Reexam",
  "Other",
];

export default function HistoryVetAppointment() {
  // Final filters used to filter appointments
  const [appliedDateRange, setAppliedDateRange] = useState([]);
  const [appliedType, setAppliedType] = useState(null);

  // Temporary filter values until Apply is clicked
  const [tempDateRange, setTempDateRange] = useState([]);
  const [tempType, setTempType] = useState(null);

  const handleApply = () => {
    // setAppliedDateRange(tempDateRange);
    // setAppliedType(tempType);
    toast.info("Clicked");
  };

  const handleClear = () => {
    setTempDateRange([]);
    setTempType(null);
    setAppliedDateRange([]);
    setAppliedType(null);
  };

  const filtered = mockAppointments.filter((a) => {
    const matchesType = !appliedType || a.appointment_type === appliedType;
    const matchesDate =
      appliedDateRange.length !== 2 ||
      (dayjs(a.appointment_date).isSameOrAfter(appliedDateRange[0], "day") &&
        dayjs(a.appointment_date).isSameOrBefore(appliedDateRange[1], "day"));
    return matchesType && matchesDate;
  });

  return (
    <div className="space-y-6 p-6 pt-0">
      {/* Filters */}
      <div className="w-full m-0 flex flex-row justify-between items-center sticky top-0 bg-white/30 backdrop-blur-md shadow rounded-b-xl p-6 pt-6 mb-6  z-[1000]">
        <div className="w-1/2 grid grid-cols-2 gap-4">
          <RangePicker
            className="w-full"
            value={tempDateRange}
            onChange={(range) => setTempDateRange(range || [])}
          />
          <Select
            className="w-full"
            allowClear
            placeholder="Filter by Appointment Type"
            value={tempType}
            onChange={(value) => setTempType(value)}
          >
            {appointmentTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </div>

        <Space>
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>
          <Button onClick={handleClear}>Clear</Button>
        </Space>
      </div>

      {/* Results */}
      <div>
        {filtered.length === 0 ? (
          <Empty description="No appointments found." />
        ) : (
          <>
            {filtered.map((appointment) => (
              <AppointmentInfoDisplay
                key={appointment.appointment_id}
                appointment={appointment}
                pet={appointment.pet}
                vet={appointment.veterinarian}
                onSeeDetails={() => {
                  console.log("See details for", appointment.appointment_id);
                }}
              />
            ))}

            <div className="py-6">
              <Divider>
                <span className="text-sm logo text-gray-500">End of list</span>
              </Divider>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
