import { Empty, Pagination, Spin } from "antd";
import React, { useState, useEffect } from "react";
import AppointmentInfoDisplay from "../../../components/center/vet/AppointmentInfoDisplay";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUpcomingAppointmentByVetId } from "../../../apis/api";

export default function UpcomingAppointmentPage() {
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(1); // 1-based page index for UI
  const [pageSize, setPageSize] = useState(10); // default page size
  const [loading, setLoading] = useState(false);

  const user_id = useSelector((state) => state.user.user_id);

  const fetchAppointments = (pageNumber, size) => {
    setLoading(true);
    // Note: Adjust API call if it expects zero-based page index
    getUpcomingAppointmentByVetId(user_id, pageNumber - 1, size)
      .then((res) => {
        setData(res.data.content || []);
        setTotalElements(res.data.totalElements || 0);
      })
      .catch(() => {
        toast.error("Failed to get appointments!!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user_id) {
      fetchAppointments(page, pageSize);
    }
  }, [user_id, page, pageSize]);

  const onPageChange = (pageNumber, newPageSize) => {
    setPage(pageNumber);
    setPageSize(newPageSize);
  };

  return (
    <div className="p-6">
      <div className="logo text-xl mb-12">Upcoming Appointments</div>
      {/* Results */}
      <div>
        {loading ? (
          <div>
            <Spin />
          </div>
        ) : data.length === 0 ? (
          <Empty description="No appointments found." />
        ) : (
          <>
            {data.map((appointment) => (
              <AppointmentInfoDisplay
                key={appointment.appointmentId}
                appointment={appointment}
              />
            ))}
          </>
        )}

        <div className="flex justify-center items-center p-6 pb-12">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalElements}
            showSizeChanger
            onChange={onPageChange}
            onShowSizeChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
