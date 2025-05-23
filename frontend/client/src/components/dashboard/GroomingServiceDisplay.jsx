import React from "react";
import BannerImage from "../../assets/1912.i126.020.grooming.jpg";
import { Link } from "react-router";
import { FaBath, FaSpa } from "react-icons/fa6";
import { FaSprayCanSparkles } from "react-icons/fa6";

export default function GroomingServiceDisplay() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 logo">
        <div className="p-2 bg-pink-50 rounded-lg">
          <FaSprayCanSparkles className="text-2xl text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Grooming Services</h1>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Services Section */}
        <div className="grid gap-6">
          {/* Bath & Cut Service */}
          <Link to="services/grooming/bath" className="block h-full">
            <div className="group relative w-full h-full px-6 py-6 overflow-hidden bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl shadow-lg flex items-center gap-4 transition-all duration-300 ease-in-out transform border-2 border-pink-200 hover:border-pink-400 hover:scale-105 hover:shadow-2xl hover:shadow-pink-200/50">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink-400/20 to-pink-500/20 blur-sm" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="p-3 rounded-xl bg-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <FaBath className="text-2xl text-pink-600 group-hover:text-pink-700 transition-colors duration-300" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  Bath & Cut
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-pink-600"
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

          {/* Pet Spa Service */}
          <Link to="services/grooming/spa" className="block h-full">
            <div className="group relative w-full h-full px-6 py-6 overflow-hidden bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl shadow-lg flex items-center gap-4 transition-all duration-300 ease-in-out transform border-2 border-purple-200 hover:border-purple-400 hover:scale-105 hover:shadow-2xl hover:shadow-purple-200/50">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-400/20 to-purple-500/20 blur-sm" />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className="p-3 rounded-xl bg-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <FaSpa className="text-2xl text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                </div>
                <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  Pet Spa
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-purple-600"
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

        {/* Image Section */}
        <div className="relative">
          <img
            src={BannerImage}
            alt="Pet grooming services banner"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
