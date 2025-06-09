import React, { useEffect, useState } from "react";
import BookingFilter from "../../../../components/center/staff/BookingFilter";

import { Empty, Pagination } from "antd";
import BookingDisplayEditable from "../../../../components/center/staff/BookingDisplayEditable";
import { getBoardingBookingHistory } from "../../../../apis/api";
import { toast } from "react-toastify";

export default function BookingHistoryPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBoardingBookingHistory()
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("Failed to get data");
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-row gap-2 ">
      <div className="w-1/5">
        <BookingFilter />
      </div>
      <div className="w-4/5 h-screen overflow-y-auto pt-6 pb-20 space-y-6 px-6">
        <div className="flex flex-col justify-center gap-6">
          {data && data?.length ? (
            <>
              {data.map((booking) => (
                <BookingDisplayEditable booking={booking} isEditable={false} />
              ))}
            </>
          ) : (
            <>
              <div className=" pt-32">
                {" "}
                <Empty />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
