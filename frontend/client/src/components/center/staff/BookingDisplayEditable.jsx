import React from "react";
import { Tag, Button, Select } from "antd";
import dayjs from "dayjs";

const statusOptions = [
  { value: "Pending", color: "orange" },
  { value: "Confirmed", color: "blue" },
  { value: "Completed", color: "green" },
  { value: "CheckedIn", color: "cyan" },
  { value: "CheckedOut", color: "purple" },
  { value: "Cancelled", color: "red" },
];

export default function BookingDisplayEditable({
  booking,
  onStatusChange,
  onStaffChange,
  staffOptions = [],
}) {
  if (!booking) return null;

  const formatDateRange = (checkIn, checkOut) => {
    const start = dayjs(checkIn);
    const end = dayjs(checkOut);
    const days = end.diff(start, "day");

    if (start.year() === end.year()) {
      return {
        range: `${start.format("MMM D")} - ${end.format("MMM D")}`,
        duration: `${days}d`,
      };
    }

    return {
      range: `${start.format("MMM D, YY")} - ${end.format("MMM D, YY")}`,
      duration: `${days}d`,
    };
  };

  const { range, duration } = formatDateRange(
    booking.check_in_date,
    booking.check_out_date
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden group">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-3 py-2.5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span>📅</span>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm leading-tight">
                {range}
              </div>
              <div className="text-xs text-gray-500">{duration}</div>
            </div>
          </div>

          <Select
            size="small"
            value={booking.status || statusOptions[0].value}
            onChange={onStatusChange}
            className="min-w-[100px]"
            options={statusOptions}
          />
        </div>
      </div>

      {/* Compact Content Grid */}
      <div className="px-3 py-2.5 space-y-2">
        {/* Pet & Owner Row */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span>🐕</span>

            <span className="text-gray-600 truncate">
              <span className="text-black font-bold">#{booking.pet_id}</span> -{" "}
              {booking.pet?.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>👤</span>
            <span className="text-gray-600 truncate">
              {booking.owner?.name}
            </span>
          </div>
          {/* Staff Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs">
              <span>👨‍⚕️</span>
              <span className="text-gray-600">Staff:</span>
            </div>
            <Select
              size="small"
              value={booking.staff_id}
              onChange={onStaffChange}
              placeholder="Assign staff"
              className="flex-1 max-w-[120px] ml-2"
              options={staffOptions.map((staff) => ({
                label: staff.name,
                value: staff.id,
              }))}
            />
          </div>
        </div>

        {/* Client Notes - Subtle Version */}
        {booking.client_notes && (
          <div className="bg-gray-50 border-l-3 border-l-blue-400 rounded-r-lg p-2.5 mt-2">
            <div className="text-xs text-gray-700 leading-relaxed">
              <span className="font-medium text-gray-800">
                📝 Client Notes:{" "}
              </span>
              {booking.client_notes}
            </div>
          </div>
        )}
      </div>

      {/* Compact Footer */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <Tag
              size="small"
              color="geekblue"
              className="text-xs px-1.5 py-0.5"
            >
              Booking #{booking.booking_id || "N/A"}
            </Tag>
            <Tag size="small" color="volcano" className="text-xs px-1.5 py-0.5">
              Room {booking.room?.room_number || booking.room_id || "N/A"}
            </Tag>
          </div>

          <Button type="primary" size="small">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
