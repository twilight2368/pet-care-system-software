import React, { useEffect, useState } from "react";
import "../layout.css";
import GroomingModal from "../../components/modals/GroomingModal";
import { FaBath } from "react-icons/fa6";
import GroomingServiceList from "../../components/grooming/GroomingServiceList";
import { useSelector } from "react-redux";
import { getGroomingServiceBooking } from "../../apis/api";
import { toast } from "react-toastify";

export default function GroomingPage() {
  const [data, setData] = useState([]);
  const user_id = useSelector((state) => state.user.user_id);

  useEffect(() => {
    getGroomingServiceBooking(user_id)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("Oop!");
      });
  }, [user_id]);

  return (
    <div className="w-full outlet-layout m-0 overflow-y-auto p-6 ">
      <div className="w-full flex flex-row gap-6 items-center">
        <div className="flex flex-row gap-2 logo text-2xl ">
          <FaBath />
          Grooming service
        </div>
        <div>
          <GroomingModal />
        </div>
      </div>
      <div className="w-full">
        <GroomingServiceList data={data} />
      </div>
    </div>
  );
}
