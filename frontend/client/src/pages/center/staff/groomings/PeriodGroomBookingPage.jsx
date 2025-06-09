import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { BsCalendar2WeekFill, BsCalendar2MonthFill } from "react-icons/bs";
import GroomingServiceRowDisplay from "../../../../components/center/staff/GroomingServiceRowDisplay";
import { getGroomingBookingByPattern } from "../../../../apis/api";
import { toast } from "react-toastify";

export default function PeriodGroomBookingPage() {
  // Weekly state
  const [weeklyBookings, setWeeklyBookings] = useState([]);
  const [weeklyPage, setWeeklyPage] = useState(1);
  const [weeklyTotal, setWeeklyTotal] = useState(0);

  // Monthly state
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [monthlyPage, setMonthlyPage] = useState(1);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const pageSize = 5;

  useEffect(() => {
    fetchWeeklyBookings(weeklyPage, pageSize);
  }, [weeklyPage]);

  useEffect(() => {
    fetchMonthlyBookings(monthlyPage, pageSize);
  }, [monthlyPage]);

  const fetchWeeklyBookings = (page, size) => {
    getGroomingBookingByPattern(page - 1, size, "WEEKLY")
      .then((res) => {
        setWeeklyBookings(res.data?.content || []);
        setWeeklyTotal(res.data?.page?.totalElements || 0);
      })
      .catch(() => toast.error("Failed to load weekly bookings"));
  };

  const fetchMonthlyBookings = (page, size) => {
    getGroomingBookingByPattern(page - 1, size, "MONTHLY")
      .then((res) => {
        setMonthlyBookings(res.data?.content || []);
        setMonthlyTotal(res.data?.page?.totalElements || 0);
      })
      .catch(() => toast.error("Failed to load monthly bookings"));
  };

  return (
    <div className="w-full p-6">
      {/* Weekly Bookings */}
      <div className="w-full mb-12">
        <div className="flex flex-row gap-2 items-center text-2xl mb-6">
          <BsCalendar2WeekFill />
          <span>Weekly Bookings</span>
        </div>
        <div className="w-3/4 mx-auto grid grid-cols-1 gap-6 p-3">
          {weeklyBookings.map((booking) => (
            <GroomingServiceRowDisplay
              key={booking.groomingId}
              grooming_service={booking}
              isDisabled
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            current={weeklyPage}
            pageSize={pageSize}
            total={weeklyTotal}
            onChange={(page) => setWeeklyPage(page)}
          />
        </div>
      </div>

      {/* Monthly Bookings */}
      <div className="w-full pb-20">
        <div className="flex flex-row gap-2 items-center text-2xl mb-6">
          <BsCalendar2MonthFill />
          <span>Monthly Bookings</span>
        </div>
        <div className="w-3/4 mx-auto grid grid-cols-1 gap-6 p-3">
          {monthlyBookings.map((booking) => (
            <GroomingServiceRowDisplay
              key={booking.groomingId}
              grooming_service={booking}
              isDisabled
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            current={monthlyPage}
            pageSize={pageSize}
            total={monthlyTotal}
            onChange={(page) => setMonthlyPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
