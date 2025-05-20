import React from "react";
import LogoImage from "../../assets/paw.png";

export default function Footer() {
  return (
    <div className="w-full h-24 flex items-center justify-center mt-10">
      <div className="flex items-center gap-4">
        <img
          src={LogoImage}
          alt="PawPal Logo"
          className="h-10 w-10 object-contain"
        />
        <div className="text-xl font-semibold text-gray-600 logo">PawPal</div>
      </div>
    </div>
  );
}
