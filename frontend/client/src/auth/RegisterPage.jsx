import React from "react";
import { Card } from "antd";
import RegisterCard from "../components/auth/RegisterCard";
import DogImage from "../assets/jamie-street-s9Tf1eBDFqw-unsplash.jpg";
export default function RegisterPage() {
  return (
    <>
      <div className=" min-h-screen bg-black text-white">
        <div className="w-screen h-screen flex flex-row">
          <div className="w-2/3 h-full">
            <img
              src={DogImage}
              alt="image"
              className="w-full h-full"
            />
          </div>
          <div className="w-1/3 bg-gradient-to-br from-white to-blue-50 overflow-y-clip flex justify-center items-center">
            <RegisterCard />
          </div>
        </div>
      </div>
    </>
  );
}
