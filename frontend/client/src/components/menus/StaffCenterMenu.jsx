import React from "react";
import { Menu } from "antd";
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
import { MdFiberNew, MdEventRepeat } from "react-icons/md";

import { useNavigate } from "react-router";
import { BiNews } from "react-icons/bi";

export default function StaffCenterMenu() {
  const navigate = useNavigate();

  const handleClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      onClick={handleClick}
      className="border-r"
      defaultOpenKeys={["appointments", "grooming", "boarding", "account"]}
    >
      <Menu.Item key="/center/staff" icon={<HomeOutlined />}>
        Home
      </Menu.Item>

      <Menu.ItemGroup key="appointments" title="Appointments">
        <Menu.Item
          key="/center/staff/appointments/today"
          icon={<CalendarOutlined />}
        >
          Today's Appointments
        </Menu.Item>
        <Menu.Item key="/center/staff/appointments/new" icon={<MdFiberNew />}>
          New Appointments
        </Menu.Item>
        <Menu.Item
          key="/center/staff/appointments/history"
          icon={<HistoryOutlined />}
        >
          Appointment History
        </Menu.Item>
        <Menu.Item
          key="/center/staff/appointments/all"
          icon={<AppstoreOutlined />}
        >
          All Appointments
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="grooming" title="Grooming Services">
        <Menu.Item
          key="/center/staff/grooming/manage"
          icon={<ScissorOutlined />}
        >
          Manage Grooming Services
        </Menu.Item>
        <Menu.Item key="/center/staff/grooming/new" icon={<MdFiberNew />}>
          New Grooming Bookings
        </Menu.Item>
        <Menu.Item
          key="/center/staff/grooming/repeats"
          icon={<MdEventRepeat />}
        >
          Period Grooming Bookings
        </Menu.Item>
        <Menu.Item
          key="/center/staff/grooming/history"
          icon={<HistoryOutlined />}
        >
          Grooming History
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="boarding" title="Boarding Services">
        <Menu.Item
          key="/center/staff/boarding/rooms"
          icon={<ApartmentOutlined />}
        >
          Manage Rooms
        </Menu.Item>
        <Menu.Item
          key="/center/staff/boarding/bookings"
          icon={<ShopOutlined />}
        >
          Manage Bookings
        </Menu.Item>
        <Menu.Item
          key="/center/staff/boarding/history"
          icon={<DatabaseOutlined />}
        >
          Booking History
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="account" title="Account">
        <Menu.Item key="/center/staff/settings" icon={<SettingOutlined />}>
          Account Settings
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
}
