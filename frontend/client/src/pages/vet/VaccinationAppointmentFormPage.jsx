import React, { useEffect, useState } from "react";
import VetModal from "../../components/modals/VetModal";
import VetServiceList from "../../components/vets/VetServiceList";
import "../layout.css";
import { useSelector } from "react-redux";
import { getUserAppointmentAndType } from "../../apis/api";
import { toast } from "react-toastify";

export default function VaccinationAppointmentFormPage() {
  const [data, setData] = useState([]);
  const user_id = useSelector((state) => state.user.user_id);
  useEffect(() => {
    getUserAppointmentAndType(user_id, "VACCINATION")
      .then((res) => {
        setData(res.data);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
      })
      .catch((err) => {
        toast.error("Oop!");
      });
  }, [user_id]);
  return (
    <div className="p-3 w-full outlet-layout m-0 overflow-y-auto">
      <div className=" mx-auto p-4 flex flex-row items-center  gap-6 ">
        <h2 className="text-2xl logo">💉 Vaccination Appointment</h2>
        <div>
          <VetModal enroll_for={"VACCINATION"} />
        </div>
      </div>
      <div>
        <VetServiceList data={data} />
      </div>
    </div>
  );
}
