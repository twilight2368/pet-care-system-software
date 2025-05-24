import React from "react";
import { Menu } from "antd";
import {
  CalendarOutlined,
  HistoryOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { MdUpcoming } from "react-icons/md";

export default function VetCenterMenu() {
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
      defaultOpenKeys={["appointments", "account"]}
    >
      <Menu.Item key="/center/vet" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.ItemGroup key="appointments" title="Appointments">
        <Menu.Item
          key="/center/vet/appointments/today"
          icon={<CalendarOutlined />}
        >
          Today's Appointments
        </Menu.Item>
        <Menu.Item
          key="/center/vet/appointments/history"
          icon={<HistoryOutlined />}
        >
          Appointment History
        </Menu.Item>
        <Menu.Item
          key="/center/vet/appointments/upcoming"
          icon={<MdUpcoming />}
        >
          Upcoming Appointments
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="account" title="Account">
        <Menu.Item key="/center/vet/settings" icon={<SettingOutlined />}>
          Account Settings
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
}
