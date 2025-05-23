import React from "react";
import BannerImage from "../../assets/2204_w046_n004_109b_p1_109.jpg";
import { Link } from "react-router";
import { FaBath, FaSpa } from "react-icons/fa6";
import { BiInjection } from "react-icons/bi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";

export default function HealthCheckDisplay() {
  return (
    <div className=" mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 logo">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FaStethoscope className="text-2xl text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Veterinary Services
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Image Section */}
        <div className="relative flex justify-center items-center">
          <img
            src={BannerImage}
            alt="Pet grooming services banner"
            className="w-full h-auto rounded-2xl"
          />
        </div>

        {/* Services Section */}
        <div className="grid gap-6">
          {/* Injection Service */}
          <Link to="services/vet/injection" className="block h-full">
            <div className="group relative w-full h-full px-6 py-6 overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg flex items-center gap-4 transition-all duration-300 ease-in-out transform border-2 border-blue-200 hover:border-blue-400 hover:scale-105 hover:shadow-2xl hover:shadow-blue-200/50">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/20 to-blue-500/20 blur-sm" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="p-3 rounded-xl bg-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <BiInjection className="text-2xl text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  Injection Services
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Health Check Service */}
          <Link to="services/vet/health-check" className="block h-full">
            <div className="group relative w-full h-full px-6 py-6 overflow-hidden bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-lg flex items-center gap-4 transition-all duration-300 ease-in-out transform border-2 border-red-200 hover:border-red-400 hover:scale-105 hover:shadow-2xl hover:shadow-red-200/50">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-400/20 to-red-500/20 blur-sm" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="p-3 rounded-xl bg-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <MdOutlineHealthAndSafety className="text-2xl text-red-600 group-hover:text-red-700 transition-colors duration-300" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  Health Checkup
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
