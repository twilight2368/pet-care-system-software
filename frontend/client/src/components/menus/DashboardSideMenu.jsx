import React from "react";
import { Menu } from "antd";
import {
  MdOutlineSpa,
  MdDashboard,
  MdPets,
  MdEventAvailable,
  MdSpa,
  MdHotel,
  MdNotifications,
  MdSettings,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { BiInjection } from "react-icons/bi";
import { FaStethoscope, FaBath } from "react-icons/fa6";

import { useNavigate } from "react-router";

const items = [
  {
    key: "dashboard",
    icon: <MdDashboard />,
    label: "Dashboard",
  },
  {
    key: "pet-profile",
    icon: <MdPets />,
    label: "Pet Profiles",
  },
  {
    key: "appointments",
    icon: <MdEventAvailable />,
    label: "Appointments",
  },
  {
    key: "grooming",
    icon: <MdSpa />,
    label: "Grooming Services",
    children: [
      { key: "bath", label: "Bath & Cut", icon: <FaBath /> },
      { key: "spa", label: "Pet Spa", icon: <MdOutlineSpa /> },
    ],
  },
  {
    key: "veterinary",
    icon: <FaStethoscope />,
    label: "Veterinary Services",
    children: [
      { key: "injection", label: "Injections", icon: <BiInjection /> },
      {
        key: "health-check",
        label: "Health Check",
        icon: <MdOutlineHealthAndSafety />,
      },
    ],
  },
  {
    key: "boarding",
    icon: <MdHotel />,
    label: "Boarding",
  },
  {
    key: "notifications",
    icon: <MdNotifications />,
    label: "Reminders",
  },
  {
    type: "divider",
  },
  {
    key: "settings",
    icon: <MdSettings />,
    label: "Settings",
  },
];

const DashboardSideMenu = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("Menu clicked: ", e.key);

    switch (e.key) {
      case "dashboard":
        navigate("/home");
        break;
      case "pet-profile":
        navigate("/home/pets");
        break;
      case "appointments":
        navigate("/home/appointments");
        break;
      case "bath":
        navigate("/home/services/grooming/bath");
        break;
      case "spa":
        navigate("/home/services/grooming/spa");
        break;
      case "injection":
        navigate("/home/services/vet/injection");
        break;
      case "health-check":
        navigate("/home/services/vet/health-check");
        break;
      case "boarding":
        navigate("/home/services/boarding");
        break;
      case "notifications":
        navigate("/home/notifications");
        break;
      case "settings":
        navigate("/home/settings");
        break;
      default:
        console.warn("No navigation handler for:", e.key);
    }
  };

  return (
    <Menu
      onClick={onClick}
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      defaultOpenKeys={["grooming", "veterinary"]}
      items={items}
    />
  );
};

export default DashboardSideMenu;
