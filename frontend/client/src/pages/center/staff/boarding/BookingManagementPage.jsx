import React from "react";
import BookingDisplayEditable from "../../../../components/center/staff/BookingDisplayEditable";
import { Divider } from "antd";

export default function BookingManagementPage() {
  return (
    <div className="w-full p-6">
      <div className=" logo text-2xl p-6 pt-0">📅 Manage Bookings</div>
      <div className="px-24 space-y-6">
        <BookingDisplayEditable
          booking={{
            booking_id: 101,
            pet_id: 201,
            owner_id: 301,
            staff_id: 1,
            room_id: 12,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-05",
            status: "Confirmed",
            client_notes:
              "Bella is very social and loves playing with other dogs, but she can be possessive of toys. Please supervise during group play.",
            pet: { name: "Bella" },
            owner: { name: "Alice Smith" },
            staff: { name: "Dr. John Doe" },
            room: { room_number: 305 },
          }}
          onStatusChange={(newStatus) =>
            console.log("Updated status:", newStatus)
          }
          onStaffChange={(staffId) =>
            console.log("Assigned to staff:", staffId)
          }
          staffOptions={[
            { id: 1, name: "Dr. John" },
            { id: 2, name: "Nurse Amy" },
            { id: 3, name: "Dr. Lee" },
          ]}
        />
        <BookingDisplayEditable
          booking={{
            booking_id: 101,
            pet_id: 201,
            owner_id: 301,
            staff_id: 1,
            room_id: 12,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-05",
            status: "Confirmed",
            pet: { name: "Bella" },
            owner: { name: "Alice Smith" },
            staff: { name: "Dr. John Doe" },
            room: { room_number: 305 },
          }}
          onStatusChange={(newStatus) =>
            console.log("Updated status:", newStatus)
          }
          onStaffChange={(staffId) =>
            console.log("Assigned to staff:", staffId)
          }
          staffOptions={[
            { id: 1, name: "Dr. John" },
            { id: 2, name: "Nurse Amy" },
            { id: 3, name: "Dr. Lee" },
          ]}
        />
        <BookingDisplayEditable
          booking={{
            booking_id: 101,
            pet_id: 201,
            owner_id: 301,
            staff_id: 1,
            room_id: 12,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-05",
            status: "Confirmed",
            pet: { name: "Bella" },
            owner: { name: "Alice Smith" },
            staff: { name: "Dr. John Doe" },
            room: { room_number: 305 },
          }}
          onStatusChange={(newStatus) =>
            console.log("Updated status:", newStatus)
          }
          onStaffChange={(staffId) =>
            console.log("Assigned to staff:", staffId)
          }
          staffOptions={[
            { id: 1, name: "Dr. John" },
            { id: 2, name: "Nurse Amy" },
            { id: 3, name: "Dr. Lee" },
          ]}
        />
        <BookingDisplayEditable
          booking={{
            booking_id: 101,
            pet_id: 201,
            owner_id: 301,
            staff_id: 1,
            room_id: 12,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-05",
            status: "Confirmed",
            client_notes:
              "Bella is very social and loves playing with other dogs, but she can be possessive of toys. Please supervise during group play.",
            pet: { name: "Bella" },
            owner: { name: "Alice Smith" },
            staff: { name: "Dr. John Doe" },
            room: { room_number: 305 },
          }}
          onStatusChange={(newStatus) =>
            console.log("Updated status:", newStatus)
          }
          onStaffChange={(staffId) =>
            console.log("Assigned to staff:", staffId)
          }
          staffOptions={[
            { id: 1, name: "Dr. John" },
            { id: 2, name: "Nurse Amy" },
            { id: 3, name: "Dr. Lee" },
          ]}
        />
        <BookingDisplayEditable
          booking={{
            booking_id: 101,
            pet_id: 201,
            owner_id: 301,
            staff_id: 1,
            room_id: 12,
            check_in_date: "2025-06-01",
            check_out_date: "2025-06-05",
            status: "Confirmed",
            client_notes:
              "Bella is very social and loves playing with other dogs, but she can be possessive of toys. Please supervise during group play.",
            pet: { name: "Bella" },
            owner: { name: "Alice Smith" },
            staff: { name: "Dr. John Doe" },
            room: { room_number: 305 },
          }}
          onStatusChange={(newStatus) =>
            console.log("Updated status:", newStatus)
          }
          onStaffChange={(staffId) =>
            console.log("Assigned to staff:", staffId)
          }
          staffOptions={[
            { id: 1, name: "Dr. John" },
            { id: 2, name: "Nurse Amy" },
            { id: 3, name: "Dr. Lee" },
          ]}
        />
      </div>
      <div className="pt-6 pb-12 ">
        <Divider>
          <span className=" text-gray-400 text-sm logo">
            • End of Results •
          </span>
        </Divider>
      </div>
    </div>
  );
}
