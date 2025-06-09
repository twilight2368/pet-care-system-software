import React, { useState } from "react";
import { Tag, Button, Select, Input } from "antd";
import dayjs from "dayjs";
import { ServiceStatusTag } from "../../tags/CustomTags";
import { updateBoardingBooking } from "../../../apis/api";
import { toast } from "react-toastify";

const { TextArea } = Input;
const { Option } = Select;

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CHECKED_IN", label: "Checked In" },
  { value: "CHECKED_OUT", label: "Checked Out" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function BookingDisplayEditable({
  booking,
  staffOptions = [],
  roomsOptions = [],
  isEditable = true,
}) {
  const [localBooking, setLocalBooking] = useState(booking);

  //! NOTE: if booking is null return nothing immediately
  if (!booking) return null;

  const onChangeStatus = (value) => {
    setLocalBooking((prev) => ({ ...prev, status: value }));
  };

  const onChangeRoom = (roomId) => {
    const room = roomsOptions.find((r) => r.roomId === roomId);
    setLocalBooking((prev) => ({ ...prev, room }));
  };

  const onChangeStaff = (userId) => {
    const staff = staffOptions.find((s) => s.userId === userId);
    if (staff) {
      setLocalBooking((prev) => ({
        ...prev,
        staff: staff,
      }));
    }
  };

  const onChangeNotes = (e) => {
    setLocalBooking((prev) => ({ ...prev, notes: e.target.value }));
  };

  const handleSave = () => {
    console.log("Saving booking:", localBooking);
    if (isEditable) {
      updateBoardingBooking(localBooking.bookingId, localBooking)
        .then((res) => {
          console.log("====================================");
          console.log(res.data);
          console.log("====================================");
          toast.success("Update successfully!");
        })
        .catch(() => {
          toast.error("Failed to update!!!");
        });
    }
  };

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
    localBooking.checkInDate,
    localBooking.checkOutDate
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden group">
      {/* Header */}
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

          {isEditable ? (
            <>
              <Select
                size="small"
                value={localBooking.status}
                onChange={onChangeStatus}
                className="min-w-[100px]"
                options={statusOptions}
                disabled={!isEditable}
              />
            </>
          ) : (
            <>
              <ServiceStatusTag value={localBooking?.status || "-"} />
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-2.5 space-y-2 text-xs">
        <div className="grid grid-cols-6 gap-3">
          {/* Pet Info */}
          <div className="flex items-center gap-1.5">
            <span>🐕</span>
            <span className="text-gray-600 truncate">
              <span className="text-black font-bold">
                #{localBooking.pet?.petId}
              </span>{" "}
              - {localBooking.pet?.name}
            </span>
          </div>

          {/* Owner Info */}
          <div className="flex items-center gap-1.5">
            <span>👤</span>
            <span className="text-gray-600 truncate">
              {localBooking.owner?.fullName}
            </span>
          </div>

          {/* Staff Select */}
          <div className=" col-span-2 flex items-center justify-around">
            <div className="flex items-center gap-1.5">
              <span>👨‍⚕️</span>
              <span className="text-gray-600">Staff:</span>
            </div>
            {isEditable ? (
              <Select
                placeholder="Staff options"
                value={localBooking.staff?.userId}
                onChange={onChangeStaff}
                className="w-1/2"
                disabled={!isEditable}
              >
                {staffOptions.map((s) => (
                  <Option key={s.userId} value={s.userId}>
                    <span className="text-xs">{s.fullName}</span>
                  </Option>
                ))}
              </Select>
            ) : (
              <>
                <Tag>{localBooking.staff?.fullName || "-"}</Tag>
              </>
            )}
          </div>

          {/* Room Select or Tag */}
          <div className=" col-span-2  flex items-center justify-end">
            {isEditable ? (
              <Select
                placeholder="Choose a room"
                value={localBooking.room?.roomId}
                onChange={onChangeRoom}
                className="w-1/2"
              >
                {roomsOptions.map((r) => (
                  <Option key={r.roomId} value={r.roomId}>
                    <span className="text-xs">{r.roomNumber}</span>
                  </Option>
                ))}
              </Select>
            ) : (
              <Tag size="small" color="volcano">
                Room {localBooking.room?.roomNumber || "N/A"}
              </Tag>
            )}
          </div>
        </div>

        {/* Client Notes */}
        {localBooking.notesFromClient && (
          <div className="bg-gray-50 border-l-3 border-l-blue-400 rounded-r-lg p-2.5">
            <div className="text-gray-700">
              <span className="font-medium">📝 Client Notes: </span>
              {localBooking.notesFromClient}
            </div>
          </div>
        )}

        {/* Internal Notes */}
        {isEditable ? (
          <TextArea
            rows={3}
            value={localBooking.notes}
            onChange={onChangeNotes}
            placeholder="🖊️ Staff notes..."
          />
        ) : (
          localBooking.notes && (
            <div className="bg-gray-50 border-l-3 border-green-400 rounded-r-lg p-2.5">
              <div className="text-gray-700">
                <span className="font-medium">🖊️ Notes: </span>
                {localBooking.notes}
              </div>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <Tag size="small" color="geekblue">
            Booking #{localBooking.bookingId}
          </Tag>
          {isEditable && (
            <Button type="primary" size="small" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
