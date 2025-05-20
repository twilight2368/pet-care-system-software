import React from "react";
import LogoImage from "../../assets/paw.png";
export default function SimpleHeader() {
  return (
    <div>
      <div className="w-full h-24 text-black">
        <div className="h-full w-full flex flex-row gap-2 justify-center items-center">
          <img src={LogoImage} alt="" className="h-2/3 aspect-square" />
          <div className=" logo text-3xl">PawPal</div>
        </div>
      </div>
    </div>
  );
}
