import React from "react";
import BookingFilter from "../../../../components/center/staff/BookingFilter";
import BookingDetailsDisplay from "../../../../components/center/staff/BookingDetailsDisplay";
import { Pagination } from "antd";

export default function BookingHistoryPage() {
  return (
    <div className="w-full h-full flex flex-row gap-2 ">
      <div className="w-1/5">
        <BookingFilter />
      </div>
      <div className="w-4/5 h-screen overflow-y-auto pt-6 pb-20 space-y-6 px-6">
        <BookingDetailsDisplay
          booking={{
            booking_id: 1,
            pet_id: 101,
            owner_id: 201,
            room_id: 301,
            staff_id: 401,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-07",
            status: "Confirmed",
            pet: { name: "Bella" },
            owner: { name: "John Doe" },
            room: { room_number: 205 },
            staff: { name: "Sarah Lee" },
            // notes, notes_from_client, and images are excluded intentionally
          }}
        />
        <BookingDetailsDisplay
          booking={{
            booking_id: 1,
            pet_id: 101,
            owner_id: 201,
            room_id: 301,
            staff_id: 401,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-07",
            status: "Confirmed",
            pet: { name: "Bella" },
            owner: { name: "John Doe" },
            room: { room_number: 205 },
            staff: { name: "Sarah Lee" },
            // notes, notes_from_client, and images are excluded intentionally
          }}
        />
        <BookingDetailsDisplay
          booking={{
            booking_id: 1,
            pet_id: 101,
            owner_id: 201,
            room_id: 301,
            staff_id: 401,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-07",
            status: "Confirmed",
            pet: { name: "Bella" },
            owner: { name: "John Doe" },
            room: { room_number: 205 },
            staff: { name: "Sarah Lee" },
            // notes, notes_from_client, and images are excluded intentionally
          }}
        />
        <BookingDetailsDisplay
          booking={{
            booking_id: 1,
            pet_id: 101,
            owner_id: 201,
            room_id: 301,
            staff_id: 401,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-07",
            status: "Confirmed",
            pet: { name: "Bella" },
            owner: { name: "John Doe" },
            room: { room_number: 205 },
            staff: { name: "Sarah Lee" },
            // notes, notes_from_client, and images are excluded intentionally
          }}
        />
        <BookingDetailsDisplay
          booking={{
            booking_id: 1,
            pet_id: 101,
            owner_id: 201,
            room_id: 301,
            staff_id: 401,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-07",
            status: "Confirmed",
            pet: { name: "Bella" },
            owner: { name: "John Doe" },
            room: { room_number: 205 },
            staff: { name: "Sarah Lee" },
            // notes, notes_from_client, and images are excluded intentionally
          }}
        />
        <div className="w-full pt-3 flex justify-center items-center">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
}
