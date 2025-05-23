import React from "react";
import { Tag, Button } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const statusColors = {
  Pending: "orange",
  Confirmed: "blue",
  Completed: "green",
  CheckedIn: "cyan",
  CheckedOut: "purple",
  Cancelled: "red",
};

const Row = ({ label, value, isLast = false }) => (
  <div
    className={`flex justify-between items-center py-2 ${
      !isLast ? "border-b border-gray-100" : ""
    }`}
  >
    <span className="text-gray-600 font-medium text-sm">{label}:</span>
    <span className="text-gray-900 font-semibold text-sm">{value}</span>
  </div>
);

export default function BookingDetailsDisplay({ booking, onDetailsClick }) {
  const navigate = useNavigate();

  if (!booking) return null;

  const formatDateRange = (checkIn, checkOut) => {
    const start = dayjs(checkIn).format("MMM D");
    const end = dayjs(checkOut).format("MMM D");

    // If same year, don't repeat it
    if (dayjs(checkIn).year() === dayjs(checkOut).year()) {
      return `${start} - ${end}`;
    }

    return `${dayjs(checkIn).format("MMM D, YYYY")} - ${dayjs(checkOut).format(
      "MMM D, YYYY"
    )}`;
  };

  const getDuration = (checkIn, checkOut) => {
    const days = dayjs(checkOut).diff(dayjs(checkIn), "day");
    return days === 1 ? "1 day" : `${days} days`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header with dates */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📅</span>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 text-sm">
                {formatDateRange(booking.check_in_date, booking.check_out_date)}
              </span>
              <span className="text-xs text-gray-500">
                {getDuration(booking.check_in_date, booking.check_out_date)}
              </span>
            </div>
          </div>
          <Tag
            size="small"
            color={statusColors[booking.status] || "default"}
            className="font-medium"
          >
            {booking.status}
          </Tag>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <Row
          label="🐕 Pet"
          value={booking.pet?.name || `Pet #${booking.pet_id}`}
        />
        <Row
          label="👤 Owner"
          value={booking.owner?.name || `Owner #${booking.owner_id}`}
        />
        <Row
          label="👨‍⚕️ Staff"
          value={booking.staff?.name || `Staff #${booking.staff_id}`}
          isLast={true}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2 mb-2">
            <Tag color="geekblue" className="text-xs">
              Booking #{booking.booking_id || "N/A"}
            </Tag>
            <Tag color="volcano" className="text-xs">
              Room: {booking.room?.room_number || booking.room_id || "N/A"}
            </Tag>
          </div>
          <Button
            type="link"
            variant="link"
            size="small"
            className="h-fit px-3 text-xs font-medium"
            onClick={() => {
              navigate("/center/staff/boarding/bookings/" + 123);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
