import React from "react";
import { Card, Avatar, Typography, Carousel, Button } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import RenderPetCard from "../pets/RenderPetCard";
import { FaPaw } from "react-icons/fa";
import { useNavigate } from "react-router";
import "../custom.css";
const { Title, Text } = Typography;

// Mock list of pets (replace with real data)
const pets = [
  {
    pet_id: 1,
    name: "Bella 1",
    age: 3,
    gender: "Female",
    breed: "Golden Retriever",
    color: "Golden",
    photo_url: "",
  },
  {
    pet_id: 2,
    name: "Bella 2",
    age: 3,
    gender: "Female",
    breed: "Golden Retriever",
    color: "Golden",
    photo_url: "",
  },
  {
    pet_id: 3,
    name: "Bella 3",
    age: 3,
    gender: "Female",
    breed: "Golden Retriever",
    color: "Golden",
    photo_url: "",
  },
];

export default function MyPetBoardCard() {
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto h-full p-4 ">
      <div className="flex justify-between items-top mb-0">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 logo">
          <div className="p-2 bg-orange-800/25 rounded-lg">
            <FaPaw className="text-xl text-orange-950" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">My Pets</h2>
        </div>
        <div>
          {" "}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            onClick={() => {
              navigate("add-pet");
            }}
          >
            Add Pet
          </Button>
        </div>
      </div>

      <Carousel autoplay={false} dots arrows effect="fade" className="h-full">
        {pets.map((pet) => {
          return (
            <>
              <RenderPetCard pet={pet} />
            </>
          );
        })}
      </Carousel>
    </div>
  );
}
