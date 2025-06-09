import React, { useEffect, useState } from "react";
import { Calendar, Card, Pagination } from "antd";
import GroomingServiceRowDisplay from "../../../../components/center/staff/GroomingServiceRowDisplay";
import { FaHistory } from "react-icons/fa";
import GroomingServiceFilterForm from "../../../../components/center/staff/GroomingServiceFilterForm";
import { getHistoryGroomingBooking } from "../../../../apis/api";
import { toast } from "react-toastify";

export default function HistoryGroomingBookingPage() {
  const [groomings, setGroomings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // or whatever default
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    getHistoryGroomingBooking(currentPage - 1, pageSize)
      .then((res) => {
        setGroomings(res.data?.content);
        setTotalItems(res.data?.page?.totalElements || 0);
        console.log("====================================");
        console.log(res.data?.content);
        console.log("====================================");
      })
      .catch(() => {
        toast.error("Failed to get bookings");
      });
  }, [currentPage, pageSize]);

  return (
    <div className="w-full flex flex-row gap-2 items-start">
      <div className="w-1/4 h-full">
        <div className="logo flex flex-row items-center gap-2 text-xl p-6 mb-3">
          <FaHistory />
          History bookings
        </div>
        <div className="flex justify-center px-1">
          <Card className="w-full">
            <GroomingServiceFilterForm />
          </Card>
        </div>
      </div>
      <div className="w-3/4 h-screen overflow-y-auto">
        <div className=" grid grid-cols-1 gap-6 px-6 pt-6 pb-12">
          {groomings.map((grooming) => (
            <GroomingServiceRowDisplay
              isDisabled={true}
              grooming_service={grooming}
            />
          ))}
        </div>
        <div className="flex justify-center pb-12">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
            showSizeChanger
          />
        </div>
      </div>
    </div>
  );
}
