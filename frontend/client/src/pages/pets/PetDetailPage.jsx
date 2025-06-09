import React, { useEffect, useState } from "react";
import "../layout.css";
import { Button, Empty } from "antd";
import RenderPetCardWithCover from "../../components/pets/RenderPetCardWithCover";
import { useNavigate } from "react-router";
import { getPetByUser } from "../../apis/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PetDetailPage() {
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.user.user_id);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPetByUser(user_id)
      .then((res) => {
        setPets(res.data);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
      })
      .catch(() => {
        toast.error("Oop!");
      });
  }, [user_id]);

  return (
    <div className="p-6 w-full outlet-layout m-0 overflow-y-auto">
      <div className=" flex flex-row justify-between items-center pt-3 pb-12">
        <div className="logo text-2xl"> My pets profile</div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            navigate("/home/add-pet");
          }}
        >
          Add pet profile
        </Button>
      </div>
      {pets?.length ? (
        <>
          <div className="w-full grid grid-cols-3 gap-9">
            {pets.map((pet) => (
              <RenderPetCardWithCover pet={pet} />
            ))}
          </div>
        </>
      ) : (
        <>
          <Empty />
        </>
      )}
    </div>
  );
}
