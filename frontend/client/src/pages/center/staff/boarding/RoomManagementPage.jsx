import { Button } from "antd";
import React, { useState } from "react";

import AddRoomModal from "../../../../components/modals/AddRoomModal";

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
        <div className="w-fit h-fit fixed bottom-3.5 right-3.5">
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

        <div className="flex-1 p-4">
          {selectedRoomId
            ? `Room ${
                mockRooms.find((r) => r.room_id === selectedRoomId)?.room_number
              } selected`
            : "Select a room"}
        </div>
      </div>
    </>
  );
}
