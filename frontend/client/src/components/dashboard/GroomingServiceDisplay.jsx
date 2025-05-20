import React from "react";
import BannerImage from "../../assets/8465586.jpg";
import { Link } from "react-router";
import { FaBath, FaSpa } from "react-icons/fa6";
import { FaSprayCanSparkles } from "react-icons/fa6";

export default function GroomingServiceDisplay() {
  return (
    <>
      <div className=" logo text-2xl mb-6 flex flex-row gap-2 items-center">
        <FaSprayCanSparkles />
        Grooming services
      </div>
      <div className="w-full flex flex-row gap-6.5">
        <div className="w-1/2 grid grid-cols-1 gap-6">
          <Link to="services/grooming/bath">
            <div className="group relative w-full h-full px-6 py-4 overflow-hidden bg-white rounded-2xl shadow-md flex items-center gap-4 transition duration-300 border border-orange-300 shadow-orange-300 hover:border-orange-500">
              {/* Background fill animation */}
              <div className="absolute inset-0 bg-orange-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl z-0" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-4">
                <FaBath className="text-2xl text-orange-700 group-hover:text-white transition duration-300" />
                <span className="text-lg font-medium text-gray-800 group-hover:text-white logo transition duration-300">
                  Bath & Cut
                </span>
              </div>
            </div>
          </Link>

          {/* Pet Spa */}
          <Link to="services/grooming/spa">
            <div className="group relative w-full h-full px-6 py-4 overflow-hidden bg-white rounded-2xl shadow-md flex items-center gap-4 transition duration-300 border border-green-300 shadow-green-300 hover:border-green-500">
              <div className="absolute inset-0 bg-green-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl z-0" />

              <div className="relative z-10 flex items-center gap-4">
                <FaSpa className="text-2xl text-green-700 group-hover:text-white transition duration-300" />
                <span className="text-lg font-medium text-gray-800 group-hover:text-white logo transition duration-300">
                  Pet Spa
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-1/2">
          <img src={BannerImage} alt="" className="w-full h-auto rounded-md" />
        </div>
      </div>
    </>
  );
}
