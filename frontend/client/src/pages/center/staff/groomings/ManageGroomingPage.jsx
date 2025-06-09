import React, { useEffect, useState } from "react";
import { Calendar, Empty } from "antd";
import GroomingServiceRowDisplay from "../../../../components/center/staff/GroomingServiceRowDisplay";
import { getGroomingBookingByDay, getUserByRole } from "../../../../apis/api";
import { toast } from "react-toastify";
export default function ManageGroomingPage() {
  const [data, setData] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const onSelect = (value) => {
    const selectedDate = value.format("YYYY-MM-DD");
    getGroomingBookingByDay(selectedDate)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("Failed to fetch data");
      });
  };

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
    getGroomingBookingByDay(formattedDate)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("Failed to fetch data");
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

  return (
    <div className="w-full  flex flex-row gap-2 items-start">
      <div className="w-1/4 h-full">
        <div className="logo text-xl p-6 mb-3">Grooming bookings</div>
        <Calendar fullscreen={false} onSelect={onSelect} />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto">
        <div className=" grid grid-cols-1 gap-6 px-6 pt-6 pb-20">
          {data?.length ? (
            <>
              {" "}
              {data.map((grooming) => {
                return (
                  <GroomingServiceRowDisplay
                    grooming_service={grooming}
                    isDisabled={false}
                    staffList={staffs}
                  />
                );
              })}
            </>
          ) : (
            <>
              <div className="h-96 flex justify-center items-center">
                <Empty />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
