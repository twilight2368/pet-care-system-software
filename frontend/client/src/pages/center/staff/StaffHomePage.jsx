import React from "react";
import { useNavigate } from "react-router";
import {
  CalendarOutlined,
  HistoryOutlined,
  AppstoreOutlined,
  ScissorOutlined,
  HomeOutlined,
  SettingOutlined,
  ShopOutlined,
  DatabaseOutlined,
  ApartmentOutlined,
  BookOutlined,
} from "@ant-design/icons";

export default function StaffHomePage() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Appointments",
      items: [
        {
          label: "Today's Appointments",
          icon: <CalendarOutlined />,
          path: "/center/staff/appointments/today",
        },
        {
          label: "Appointment History",
          icon: <HistoryOutlined />,
          path: "/center/staff/appointments/history",
        },
        {
          label: "All Appointments",
          icon: <AppstoreOutlined />,
          path: "/center/staff/appointments/all",
        },
      ],
    },
    {
      title: "Grooming Services",
      items: [
        {
          label: "Manage Grooming Services",
          icon: <ScissorOutlined />,
          path: "/center/staff/grooming/manage",
        },
        {
          label: "All Grooming Bookings",
          icon: <BookOutlined />,
          path: "/center/staff/grooming/all",
        },
        {
          label: "Grooming History",
          icon: <HistoryOutlined />,
          path: "/center/staff/grooming/history",
        },
      ],
    },
    {
      title: "Boarding Services",
      items: [
        {
          label: "Manage Rooms",
          icon: <ApartmentOutlined />,
          path: "/center/staff/boarding/rooms",
        },
        {
          label: "Manage Bookings",
          icon: <ShopOutlined />,
          path: "/center/staff/boarding/bookings",
        },
        {
          label: "Booking History",
          icon: <DatabaseOutlined />,
          path: "/center/staff/boarding/history",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          label: "Account Settings",
          icon: <SettingOutlined />,
          path: "/center/staff/settings",
        },
      ],
    },
  ];

  return (
    <div className="p-6">
      {sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="text-xl font-semibold mb-4 logo text-blue-500">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.items.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-md hover:shadow-blue-300 transition-all p-6 flex items-center gap-4"
              >
                <div className="text-blue-600 text-2xl">{item.icon}</div>
                <div className="font-medium text-gray-800">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
