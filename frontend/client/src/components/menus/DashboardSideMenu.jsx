import React from "react";
import { Badge, Menu } from "antd";
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
import { FaStethoscope, FaBath, FaSprayCanSparkles } from "react-icons/fa6";

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
    key: "notifications",
    icon: <MdNotifications />,
    label: (
      <Badge count={5} size="small">
        <div className="pr-3">Notification</div>
      </Badge>
    ),
  },
  {
    key: "grooming",
    icon: <FaSprayCanSparkles />,
    label: "Grooming Services",
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
      case "grooming":
        navigate("/home/services/grooming");
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
      //defaultSelectedKeys={["dashboard"]}
      defaultOpenKeys={["grooming", "veterinary"]}
      items={items}
    />
  );
};

export default DashboardSideMenu;
