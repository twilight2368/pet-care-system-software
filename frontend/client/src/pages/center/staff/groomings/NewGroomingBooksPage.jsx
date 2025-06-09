import React, { useEffect, useState } from "react";
import { TbMailSpark } from "react-icons/tb";
import GroomingServiceRowDisplay from "../../../../components/center/staff/GroomingServiceRowDisplay";
import { getNewGroomingBooking, getUserByRole } from "../../../../apis/api";
import { toast } from "react-toastify";
import { Empty, Pagination } from "antd";
export default function NewGroomingBooksPage() {
  const [staffs, setStaffs] = useState([]);
  const [groomings, setGroomings] = useState([]);

  useEffect(() => {
    getNewGroomingBooking()
      .then((res) => {
        setGroomings(res.data);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
      })
      .catch(() => {
        toast.error("Failed to get bookings");
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
    <div className="w-full p-6">
      <div className="w-full flex flex-row gap-2 items-center logo text-2xl mb-6">
        <TbMailSpark />
        <span>New Grooming Bookings</span>
      </div>
      <div className="w-3/4 mx-auto grid grid-cols-1 gap-6 p-3 pb-20">
        {groomings?.length && groomings ? (
          <>
            {groomings.map((item) => {
              return (
                <GroomingServiceRowDisplay
                  grooming_service={item}
                  isDisabled={false}
                  staffList={staffs}
                />
              );
            })}
          </>
        ) : (
          <>
            <Empty />
          </>
        )}
      </div>
    </div>
  );
}
