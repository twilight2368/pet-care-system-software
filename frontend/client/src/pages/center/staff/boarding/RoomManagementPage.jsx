import { Button, Divider, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { Timeline } from "antd";
import AddRoomModal from "../../../../components/modals/AddRoomModal";
import BookingDisplayEditable from "../../../../components/center/staff/BookingDisplayEditable";
import { RoomTypeTag } from "../../../../components/tags/CustomTags";
import {
  getBoardingBookingByRoom,
  getRooms,
  getUserByRole,
} from "../../../../apis/api";
import { toast } from "react-toastify";

export default function RoomManagementPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data);
      })
      .catch(() => {
        toast.error("Failed to get rooms");
      });
  }, []);

  useEffect(() => {
    getUserByRole("staff".toUpperCase())
      .then((res) => {
        setStaffs(res.data);
      })
      .catch(() => {
        toast.error("Failed to get staff");
      });
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      getBoardingBookingByRoom(selectedRoomId)
        .then((res) => {
          setData(res.data);
        })
        .catch(() => {
          toast.error("Failed to get data");
        });
    }
  }, [selectedRoomId]);

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
        <div className="w-1/6 h-full overflow-y-scroll not_display_scroll border-r border-gray-200 bg-white">
          <div className="w-full">
            {rooms.map((room) => (
              <div
                key={room.room_id}
                onClick={() => setSelectedRoomId(room.roomId)}
                className={`cursor-pointer p-3 border-b text-sm flex justify-between items-center ${
                  selectedRoomId === room.roomId
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100 border-gray-200"
                }`}
              >
                <span>Room {room.roomNumber}</span>
                <RoomTypeTag value={room.roomType} />
              </div>
            ))}
            <div className="flex justify-center items-center p-3">
              <AddRoomModal />
            </div>
          </div>
        </div>

        <div className="flex-1 h-screen w-full p-4 pt-6 overflow-y-auto">
          {selectedRoomId ? (
            <>
              {data && data?.length ? (
                <>
                  <Timeline>
                    {data.map((booking) => (
                      <Timeline.Item>
                        <BookingDisplayEditable
                          booking={booking}
                          staffOptions={staffs}
                          roomsOptions={rooms}
                        />
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </>
              ) : (
                <Empty className="pt-32" />
              )}
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
