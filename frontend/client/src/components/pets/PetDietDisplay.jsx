import React from "react";
import { Button, Card, List, Tag } from "antd";
import DietPetFormModal from "./DietPetFormModal";

export default function PetDietDisplay({ petId }) {
  // Simulate diet plan data
  const diets = [
    {
      start: "2024-04-01",
      end: "2024-06-01",
      details: "High-protein puppy food, 3 meals/day",
    },
    {
      start: "2023-12-01",
      end: "2024-03-31",
      details: "Weight management formula, 2 meals/day",
    },
    {
      start: "2024-04-01",
      end: "2024-06-01",
      details: "High-protein puppy food, 3 meals/day",
    },
    {
      start: "2023-12-01",
      end: "2024-03-31",
      details: "Weight management formula, 2 meals/day",
    },
    {
      start: "2024-04-01",
      end: "2024-06-01",
      details: "High-protein puppy food, 3 meals/day",
    },
    {
      start: "2023-12-01",
      end: "2024-03-31",
      details: "Weight management formula, 2 meals/day",
    },
    {
      start: "2024-04-01",
      end: "2024-06-01",
      details: "High-protein puppy food, 3 meals/day",
    },
    {
      start: "2023-12-01",
      end: "2024-03-31",
      details: "Weight management formula, 2 meals/day",
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <span className="text-xl logo">🍖 Pet diet</span>
        <DietPetFormModal />
      </div>
      <div className=" h-[600px] p-1 overflow-y-auto">
        <List
          itemLayout="vertical"
          dataSource={diets}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <div className="flex flex-row gap-2 items-center">
                <Tag color="blue">
                  <p className="font-semibold p-1">
                    {item.start} → {item.end}
                  </p>
                </Tag>
                <div className=" flex-1">
                  <p className=" font-light text-sm italic">{item.details}</p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
