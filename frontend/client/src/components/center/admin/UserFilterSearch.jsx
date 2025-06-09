import React from "react";
import { Input, Select, Button, Divider, Space } from "antd";
import {
  SearchOutlined,
  UserSwitchOutlined,
  LockOutlined,
  UnlockOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Option } = Select;

// Use enum-style roles (uppercase strings)
const roles = ["ADMIN", "VETERINARIAN", "STAFF", "PET_OWNER"];
const lockStatusOptions = [
  { label: "Locked", value: true, icon: <LockOutlined /> },
  { label: "Unlocked", value: false, icon: <UnlockOutlined /> },
];

export default function UserSideFilter({ onApply, onReset }) {
  const [search, setSearch] = React.useState("");
  const [role, setRole] = React.useState(null);
  const [isLock, setIsLock] = React.useState(null);

  const handleApply = () => {
    onApply?.({ search, role, isLock }); // using isLock to match your data
  };

  const handleReset = () => {
    setSearch("");
    setRole(null);
    setIsLock(null);
    onReset?.();
  };

  return (
    <div className="bg-white w-full p-4 flex flex-col gap-4">
      <h3 className="logo font-semibold text-gray-700 flex items-center gap-2">
        <FilterOutlined /> Filter Users
      </h3>

      <Input
        prefix={<SearchOutlined />}
        placeholder="Search by name, email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
      />

      <Select
        className="w-full"
        placeholder="Select Role"
        value={role}
        allowClear
        onChange={setRole}
        suffixIcon={<UserSwitchOutlined />}
      >
        {roles.map((r) => (
          <Option key={r} value={r}>
            {r.charAt(0) + r.slice(1).toLowerCase().replace("_", " ")}
          </Option>
        ))}
      </Select>

      <Select
        className="w-full"
        placeholder="Lock Status"
        value={isLock}
        allowClear
        onChange={setIsLock}
        suffixIcon={<LockOutlined />}
      >
        {lockStatusOptions.map((item) => (
          <Option key={item.value.toString()} value={item.value}>
            {item.icon} {item.label}
          </Option>
        ))}
      </Select>

      <Divider className="my-2" />

      <Space direction="vertical" className="w-full">
        <Button
          type="primary"
          icon={<FilterOutlined />}
          onClick={handleApply}
          block
        >
          Apply
        </Button>
        <Button icon={<ReloadOutlined />} onClick={handleReset} block>
          Reset
        </Button>
      </Space>
    </div>
  );
}
