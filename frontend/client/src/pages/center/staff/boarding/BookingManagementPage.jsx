import React, { useEffect, useState } from "react";
import BookingDisplayEditable from "../../../../components/center/staff/BookingDisplayEditable";
import { Divider, Empty } from "antd";
import {
  getBoardingBooking,
  getBoardingBookingStatus,
  getRooms,
  getUserByRole,
} from "../../../../apis/api";
import { toast } from "react-toastify";

export default function BookingManagementPage() {
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
    getBoardingBookingStatus("PENDING")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("Failed to get data");
      });
  }, []);
  return (
    <div className="w-full p-6">
      <div className=" logo text-2xl p-6 pt-0">📅 Manage Bookings</div>
      <div className="px-24 space-y-6">
        {data && data?.length ? (
          <>
            {data.map((booking) => (
              <BookingDisplayEditable
                booking={booking}
                isEditable={true}
                staffOptions={staffs}
                roomsOptions={rooms}
              />
            ))}
          </>
        ) : (
          <>
            <Empty />
          </>
        )}
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
