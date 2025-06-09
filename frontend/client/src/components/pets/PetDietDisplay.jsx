import React, { useEffect, useState } from "react";
import { Button, Card, Empty, List, Spin, Tag } from "antd";
import DietPetFormModal from "./DietPetFormModal";
import { getDietById } from "../../apis/api";
import { toast } from "react-toastify";

export default function PetDietDisplay({ petId, pet }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDietById(petId)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("Failed to get diet plan!!!");
      });
  }, [petId, pet]);

  if (!petId || !pet) {
    return (
      <div className="w-full flex justify-center">
        <Spin tip="Loading diet" size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <span className="text-xl logo">🍖 Pet diet</span>
        <DietPetFormModal pet={pet} />
      </div>
      <div className=" h-96 p-1 overflow-y-auto">
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <div className="flex flex-row gap-2 items-center">
                <Tag color="blue">
                  <p className="font-semibold p-1">
                    {item.startDate} → {item.endDate}
                  </p>
                </Tag>
                <div className=" flex-1">
                  <p className=" font-light text-sm italic">
                    {item.dietDetails}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
