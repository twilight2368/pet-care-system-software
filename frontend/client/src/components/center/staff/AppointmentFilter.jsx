import React from "react";
import { DatePicker, Select, Button, Space } from "antd";
import { ReloadOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const appointmentTypes = [
  "Checkup",
  "Vaccination",
  "Testing",
  "Reexam",
  "Other",
];
const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "CheckedIn",
  "CheckedOut",
  "Cancelled",
];

export default function AppointmentFilter({ onApply, onReset }) {
  const [dateRange, setDateRange] = React.useState([]);
  const [type, setType] = React.useState(null);
  const [status, setStatus] = React.useState(null);

  const handleApply = () => {
    onApply?.({ dateRange, type, status });
  };

  const handleReset = () => {
    setDateRange([]);
    setType(null);
    setStatus(null);
    onReset?.();
  };

  return (
    <div className="bg-white/30 backdrop-blur-xl p-4 rounded shadow-sm space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <RangePicker
          className="w-full"
          value={dateRange}
          onChange={(range) => setDateRange(range || [])}
        />
        <Select
          className="w-full"
          allowClear
          placeholder="Filter by Type"
          value={type}
          onChange={setType}
        >
          {appointmentTypes.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
        <Select
          className="w-full"
          allowClear
          placeholder="Filter by Status"
          value={status}
          onChange={setStatus}
        >
          {statusOptions.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
        <Space className="pt-0 flex justify-center">
          <Button
            icon={<FilterOutlined />}
            type="primary"
            onClick={handleApply}
          >
            Apply
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Reset
          </Button>
        </Space>
      </div>
    </div>
  );
}
