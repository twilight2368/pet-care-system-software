import React from "react";
import { Menu } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
  SolutionOutlined,
  SettingOutlined,
  FundOutlined,
  DatabaseFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

export default function AdminCenterMenu() {
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
      defaultOpenKeys={["users", "center", "settings"]}
    >
      <Menu.Item key="/center/admin" icon={<FundOutlined />}>
        Dashboard
      </Menu.Item>

      <Menu.ItemGroup key="users" title="User Management">
        <Menu.Item key="/center/admin/users/pet-owners" icon={<UserOutlined />}>
          Pet Owners
        </Menu.Item>
        <Menu.Item key="/center/admin/users/staff" icon={<TeamOutlined />}>
          Staff
        </Menu.Item>
        <Menu.Item
          key="/center/admin/users/veterinarians"
          icon={<SolutionOutlined />}
        >
          Veterinarians
        </Menu.Item>
        <Menu.Item
          key="/center/admin/users/admins"
          icon={<UserSwitchOutlined />}
        >
          Admins
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="center" title="Center Management">
        <Menu.Item key="/center/admin/boarding" icon={<DatabaseFilled />}>
          Service History
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="settings" title="Settings">
        <Menu.Item key="/center/admin/settings" icon={<SettingOutlined />}>
          System Settings
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
}
