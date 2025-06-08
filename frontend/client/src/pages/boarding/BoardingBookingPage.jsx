import React, { useEffect, useState } from "react";
import BookingHotelModal from "../../components/modals/BookingHotelModal";
import HistoryBookingDisplay from "../../components/boarding/HistoryBookingDisplay";
import "../layout.css";
import { getBoardingBooking } from "../../apis/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function BoardingBookingPage() {
  const [data, setData] = useState();
  const user_id = useSelector((state) => state.user.user_id);

  useEffect(() => {
    getBoardingBooking(user_id)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        setData(res.data);
      })
      .catch(() => {
        toast.error("Oop!");
      });
  }, [user_id]);

  return (
    <div className="p-4 space-y-6 outlet-layout m-0 overflow-y-auto">
      <div className="flex flex-row gap-6  items-end">
        <div className=" logo text-2xl ">🏨 Boarding Booking Service</div>
        <BookingHotelModal />
      </div>
      <div className="w-full">
        <HistoryBookingDisplay bookingHistory={data} />
      </div>
    </div>
  );
}
