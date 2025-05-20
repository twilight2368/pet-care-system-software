import React from "react";
import "../layout.css";
import { Button } from "antd";
import RenderPetCardWithCover from "../../components/pets/RenderPetCardWithCover";
import Footer from "../../components/footers/Footer";
import { useNavigate } from "react-router";
const pets = [
  {
    pet_id: 1,
    name: "Bella",
    age: 3,
    gender: "Female",
    breed: "Golden Retriever",
    color: "Golden",
    photo_url: "",
  },
  {
    pet_id: 2,
    name: "Max",
    age: 2,
    gender: "Male",
    breed: "Bulldog",
    color: "White & Brown",
    photo_url: "",
  },
  {
    pet_id: 3,
    name: "Max 5",
    age: 2,
    gender: "Male",
    breed: "Bulldog",
    color: "White & Brown",
    photo_url: "",
  },
  {
    pet_id: 4,
    name: "Bella",
    age: 3,
    gender: "Female",
    breed: "Golden Retriever",
    color: "Golden",
    photo_url: "",
  },
  {
    pet_id: 5,
    name: "Max",
    age: 2,
    gender: "Male",
    breed: "Bulldog",
    color: "White & Brown",
    photo_url: "",
  },
  {
    pet_id: 6,
    name: "Max 5",
    age: 2,
    gender: "Male",
    breed: "Bulldog",
    color: "White & Brown",
    photo_url: "",
  },
];

export default function PetDetailPage() {
  const navigate = useNavigate();
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
      <div className="w-full grid grid-cols-3 gap-9">
        {pets.map((pet) => {
          return <RenderPetCardWithCover pet={pet} />;
        })}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
