import React, { useState } from "react";
import { Table, Button, Tag } from "antd";
import {
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UserSwitchOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserSideFilter from "../../../components/center/admin/UserFilterSearch";

const initialUsers = [
  {
    user_id: 1,
    username: "alice123",
    email: "alice@example.com",
    phone: "1234567890",
    full_name: "Alice Smith",
    role: "PetOwner",
    specialization: "",
    is_lock: false,
  },
  {
    user_id: 2,
    username: "vetjohn",
    email: "john@vetcare.com",
    phone: "9876543210",
    full_name: "Dr. John Vet",
    role: "Veterinarian",
    specialization: "Dermatology",
    is_lock: true,
  },
  {
    user_id: 3,
    username: "admin1",
    email: "admin@clinic.com",
    phone: "1122334455",
    full_name: "Clinic Admin",
    role: "Admin",
    specialization: "",
    is_lock: false,
  },
  {
    user_id: 4,
    username: "reception88",
    email: "reception@example.com",
    phone: "2233445566",
    full_name: "Reception Staff",
    role: "Staff",
    specialization: "",
    is_lock: true,
  },
  {
    user_id: 5,
    username: "bruno_pet",
    email: "bruno@pets.com",
    phone: "4455667788",
    full_name: "Bruno Mars",
    role: "PetOwner",
    specialization: "",
    is_lock: false,
  },
];

export default function UserManagePage() {
  const [users, setUsers] = useState(initialUsers);

  const toggleLock = (user_id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === user_id ? { ...u, is_lock: !u.is_lock } : u
      )
    );
    toast.success("Successful");
  };

  const columns = [
    {
      title: (
        <>
          <UserOutlined /> Username
        </>
      ),
      dataIndex: "username",
      key: "username",
    },
    {
      title: (
        <>
          <MailOutlined /> Email
        </>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: (
        <>
          <PhoneOutlined /> Phone
        </>
      ),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: (
        <>
          <IdcardOutlined /> Full name
        </>
      ),
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: (
        <>
          <UserSwitchOutlined /> Role
        </>
      ),
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color = "blue"; // default

        switch (role) {
          case "Admin":
            color = "red";
            break;
          case "Veterinarian":
            color = "green";
            break;
          case "Staff":
            color = "orange";
            break;
          case "PetOwner":
            color = "geekblue";
            break;
          default:
            color = "blue";
        }

        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "🧪 Specialization",
      dataIndex: "specialization",
      key: "specialization",
      render: (spec) => spec || "-",
    },
    {
      title: "🔐",
      key: "lock",
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          icon={record.is_lock ? <LockOutlined /> : <UnlockOutlined />}
          danger={record.is_lock}
          onClick={() => toggleLock(record.user_id)}
        />
      ),
    },
  ];

  return (
    <div className="w-full flex flex-row">
      <div className="w-1/5">
        <UserSideFilter />
      </div>
      <div className="w-4/5 h-screen overflow-y-auto">
        <Table
          rowKey="user_id"
          dataSource={users}
          columns={columns}
          pagination={{ pageSize: 20 }}
          bordered
          className="rounded-none"
        />
      </div>
    </div>
  );
}
