import React, { useState } from "react";
import BookingHotelModal from "../../components/modals/BookingHotelModal";
import CurrentBookingDisplay from "../../components/boarding/CurrentBookingDisplay";
import HistoryBookingDisplay from "../../components/boarding/HistoryBookingDisplay";
import "../layout.css";
import AvailableRoomsCard from "../../components/boarding/AvailableRoomCard";
const bookingHistory = [
  {
    booking_id: 1,
    pet_id: 101,
    room_number: "A101",
    check_in_date: "2025-05-01",
    check_out_date: "2025-05-05",
    status: "Completed",
  },
  {
    booking_id: 2,
    pet_id: 102,
    room_number: "A102",
    check_in_date: "2025-06-01",
    check_out_date: "2025-06-10",
    status: "Cancelled",
  },
];

const currentBookings = [
  {
    booking_id: 1,
    room_number: "B101",
    check_in_date: "2025-05-14",
    check_out_date: "2025-05-20",
    status: "Pending",
  },
  {
    booking_id: 2,
    room_number: "B203",
    check_in_date: "2025-05-10",
    check_out_date: "2025-05-15",
    status: "Completed",
  },
  {
    booking_id: 3,
    room_number: "C001",
    check_in_date: "2025-05-13",
    check_out_date: "2025-05-18",
    status: "Pending",
  },
];

export default function BoardingBookingPage() {
  return (
    <div className="p-4 space-y-6 outlet-layout m-0 overflow-y-auto">
      <div className="flex flex-row gap-6  items-end">
        <div className=" logo text-2xl ">🏨 Boarding Booking Service</div>

        <BookingHotelModal />
      </div>

      <div className=" flex flex-row items gap-3.5 mb-24">
        <div className="w-1/2 p-2">
          <div className=" font-bold text-lg mb-3">Current Bookings</div>
          <CurrentBookingDisplay bookings={currentBookings} />
        </div>
        <div className="w-1/2 p-2">
          {" "}
          <div className=" font-bold text-lg mb-3">Available rooms</div>
          <AvailableRoomsCard available={25} total={50} />
        </div>
      </div>
      <div className="w-full">
        <HistoryBookingDisplay bookingHistory={bookingHistory} />
      </div>
    </div>
  );
}
