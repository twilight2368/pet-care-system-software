import React from "react";
import LogoImage from "../../assets/paw.png";
import { Button } from "antd";
import { useNavigate } from "react-router";
export default function HomePageHeader() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-row h-24">
      <div className=" w-4/5 px-20 flex flex-row items-center gap-5">
        <div className="h-full flex justify-center items-center">
          <img src={LogoImage} alt="" className="h-2/3 aspect-square" />
        </div>
        <div className=" logo text-3xl">PawPal</div>
      </div>
      <div className="w-1/5 flex flex-row gap-3 items-center justify-center">
        <div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              navigate("/login");
            }}
            className="logo"
          >
            Login
          </Button>
        </div>
        <div>
          <Button
            type="default"
            size="large"
            onClick={() => {
              navigate("/register");
            }}
            className="logo"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
