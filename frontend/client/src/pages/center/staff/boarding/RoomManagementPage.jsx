import { Button, Divider, Empty } from "antd";
import React, { useState } from "react";
import { Timeline } from "antd";
import AddRoomModal from "../../../../components/modals/AddRoomModal";
import BookingDetailsDisplay from "../../../../components/center/staff/BookingDetailsDisplay";
import { BiCheckCircle } from "react-icons/bi";

function generateRooms(count) {
  return Array.from({ length: count }, (_, i) => ({
    room_id: i + 1,
    room_number: 100 + i + 1,
    is_available: Math.random() > 0.4, // ~60% chance available
  }));
}
const mockRooms = generateRooms(30);
export default function RoomManagementPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  return (
    <>
      <style>{`
        .not_display_scroll {
          scrollbar-width: none;
        }
        .not_display_scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="h-screen w-full flex flex-row gap-1">
        <div className="w-fit h-fit fixed bottom-3.5 right-8.5 z-[1000]">
          <AddRoomModal />
        </div>
        <div className="w-1/6 h-full overflow-y-scroll not_display_scroll border-r border-gray-200 bg-white">
          <div className="w-full">
            {mockRooms.map((room) => (
              <div
                key={room.room_id}
                onClick={() => setSelectedRoomId(room.room_id)}
                className={`cursor-pointer p-3 border-b text-sm flex justify-between items-center ${
                  selectedRoomId === room.room_id
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100 border-gray-200"
                }`}
              >
                <span>Room {room.room_number}</span>
                <span
                  className={` p-2 rounded-full ${
                    room.is_available ? " bg-green-300" : " bg-red-300"
                  }`}
                ></span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 h-screen w-full p-4 overflow-y-auto">
          {!false ? (
            <>
              <Timeline>
                <Timeline.Item>
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
                </Timeline.Item>
                <Timeline.Item>
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
                </Timeline.Item>
                <Timeline.Item>
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
                </Timeline.Item>
              </Timeline>
              <div className="pt-6 pb-12 ">
                <Divider>
                  <span className=" text-gray-400 text-sm logo">
                    • End of Results •
                  </span>
                </Divider>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-full flex justify-center items-center">
                <Empty />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
