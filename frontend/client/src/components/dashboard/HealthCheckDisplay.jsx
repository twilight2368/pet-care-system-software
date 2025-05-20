import React from "react";
import BannerImage from "../../assets/2204_w046_n004_109b_p1_109.jpg";
import { Link } from "react-router";
import { FaBath, FaSpa } from "react-icons/fa6";
import { BiInjection } from "react-icons/bi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";

export default function HealthCheckDisplay() {
  return (
    <>
      <div className=" logo text-2xl mb-6 flex flex-row gap-2">
        {" "}
        <FaStethoscope /> Veterinary services
      </div>
      <div className="w-full flex flex-row gap-6.5">
        <div className="w-1/2">
          <img src={BannerImage} alt="" className="w-full h-auto rounded-md" />
        </div>
        <div className="w-1/2 grid grid-cols-1 gap-6 ">
          {/* Injection */}
          <Link to="services/vet/injection">
            <div className="group relative w-full h-full px-6 py-4 overflow-hidden bg-white rounded-2xl shadow-md flex items-center gap-4 transition duration-300 border border-blue-300 shadow-blue-300 hover:border-blue-500">
              {/* Fill background animation */}
              <div className="absolute inset-0 bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl z-0" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-4">
                <BiInjection className="text-2xl text-blue-700 group-hover:text-white transition duration-300" />
                <span className="text-lg font-medium text-gray-800 group-hover:text-white logo transition duration-300">
                  Injection
                </span>
              </div>
            </div>
          </Link>

          {/* Health Check */}
          <Link to="services/vet/health-check">
            <div className="group relative w-full h-full px-6 py-4 overflow-hidden bg-white rounded-2xl shadow-md flex items-center gap-4 transition duration-300 border border-red-300 shadow-red-300 hover:border-red-500">
              <div className="absolute inset-0 bg-red-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl z-0" />

              <div className="relative z-10 flex items-center gap-4">
                <MdOutlineHealthAndSafety className="text-2xl text-red-700 group-hover:text-white transition duration-300" />
                <span className="text-lg font-medium text-gray-800 group-hover:text-white logo transition duration-300">
                  Health Check
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
