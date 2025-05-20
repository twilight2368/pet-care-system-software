import React from "react";
import { Card, Avatar, Typography, Carousel, Button } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import RenderPetCard from "../pets/RenderPetCard";
import { FaPaw } from "react-icons/fa";
import { useNavigate } from "react-router";

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
        <Title level={4} className="logo flex flex-row gap-2 items-center">
          <FaPaw />
          My Pets
        </Title>
        <div>
          {" "}
          <Button type="primary" icon={<PlusOutlined />} size="small" onClick={()=>{
            navigate("add-pet"); 
          }}>
            Add Pet
          </Button>
        </div>
      </div>

      <Carousel
        autoplay={false}
        dots
        arrows
        effect="fade"
        className=" rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-indigo-100 to-purple-100"
      >
        {pets.map((pet) => {
          return (
            <>
              <div className="h-60 px-6 pt-3">
                <RenderPetCard pet={pet} />
              </div>
            </>
          );
        })}
      </Carousel>
    </div>
  );
}
