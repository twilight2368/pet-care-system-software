import React, { useEffect, useState } from "react";
import "../layout.css";
import VetServiceList from "../../components/vets/VetServiceList";
import { getUserAppointment } from "../../apis/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AppointmentAllPage() {
  const [data, setData] = useState([]);
  const user_id = useSelector((state) => state.user.user_id);
  useEffect(() => {
    getUserAppointment(user_id).then((res) => {
      setData(res.data);
    }).catch(()=>{
      toast.error("Oop!")
    });
  }, [data, user_id]);

  return (
    <div className="p-3 w-full outlet-layout m-0 overflow-y-auto">
      <div className=" mx-auto p-4 flex justify-center items-center ">
        <h2 className="text-2xl logo font-bold">🏥 My appointments </h2>
      </div>
      <div>
        <VetServiceList data={data} />
      </div>
    </div>
  );
}
