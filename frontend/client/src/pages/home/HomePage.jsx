import React from "react";
import { FaArrowRight } from "react-icons/fa";
import LogoImage from "../../assets/paw.png";
import "./home.css";
import { Button } from "antd";
import HomePageHeader from "../../components/headers/HomePageHeader";
import { useNavigate } from "react-router";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className=" min-h-screen w-screen bg-black home-background">
        <div className="bg-black/50 h-screen w-screen">
          <header className="w-full text-white">
            <HomePageHeader />
          </header>
          <div className="w-full  text-white space-y-6 pt-20 flex flex-col items-center justify-center">
            <div className="h-20 mb-0 flex flex-row gap-5 justify-center items-center">
              <div className="h-full flex justify-center items-center">
                <img src={LogoImage} alt="" className="h-2/3 aspect-square" />
              </div>
              <div className=" flex flex-row justify-center items-center gap-3">
                <div className=" logo text-4xl">PawPal</div>{" "}
                <div>
                  <span className=" text-gray-300">
                    Your trusted pet care partner
                  </span>
                </div>
              </div>
            </div>
            <div className="w-2/3">
              <p className=" text-lg text-center">
                <span className=" text-3xl font-bold text-blue-200 logo">
                  Welcome to PawPal, the ultimate solution for <br /> pet owners
                  to manage and care for their pets effortlessly!
                </span>{" "}
                <br /> PawPal bridges the gap between pet care centers,
                veterinarians, and pet owners through a user-friendly platform,
                enabling health monitoring and booking services like daycare,
                boarding, dog walking, pet sitting, or vet visits. Say goodbye
                to complicated schedules and manual records — PawPal saves time,
                enhances care quality, and brings peace of mind to you and your
                pet. Join PawPal today to experience efficient and professional
                pet care!
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="primary"
                size="large"
                className=" bg-black logo"
                icon={<FaArrowRight />}
                iconPosition="end"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
