import React from "react";
import { Button, Typography } from "antd";
import { FaArrowRight, FaBed } from "react-icons/fa";
import ImageBoarding from "../../assets/pet-boarding.png"; // Replace with your image
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

const { Paragraph } = Typography;

export default function PetHotelIntro() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 logo">
        <div className="p-2 bg-purple-50 rounded-lg">
          <FaBed className="text-xl text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Boarding Service</h2>
      </div>

      <div className="flex flex-row gap-2.5 items-end">
        <div className="w-1/2 flex flex-col justify-center gap-6 pr-4">
          <p className="text-gray-800 leading-relaxed text-lg font-bold">
            Going away? Let your pets stay in style! 🐾
            <br />
            Our premium pet hotel offers spacious rooms, 24/7 care, and plenty
            of tail-wagging fun. <br /> Trusted by pet parents who want the
            best.
          </p>

          <Button
            type="dashed"
            size="large"
            className="shadow-md w-fit"
            icon={<FaArrowRight />}
            iconPosition="end"
            onClick={() => {
              navigate("services/boarding");
            }}
          >
            Reserve a Room
          </Button>
        </div>

        {/* Right: Image */}
        <div className="w-1/2 flex justify-end items-center">
          <img src={ImageBoarding} alt="Pet Hotel" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
