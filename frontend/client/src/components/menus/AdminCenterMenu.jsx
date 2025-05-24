import React from "react";
import { Menu } from "antd";
import {
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
        <Menu.Item key="/center/admin/users" icon={<DatabaseFilled />}>
          All Users
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
