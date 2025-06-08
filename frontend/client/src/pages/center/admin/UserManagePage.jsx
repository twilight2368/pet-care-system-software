import React, { useEffect, useState } from "react";
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
import { UserRoleTag } from "../../../components/tags/CustomTags";
import { getAllUsers } from "../../../apis/api";

export default function UserManagePage() {
  const [users, setUsers] = useState([]); // all users from API
  const [filteredUsers, setFilteredUsers] = useState([]); // filtered users shown in table
  const [filters, setFilters] = useState({
    search: "",
    role: null,
    isLock: null,
  });

  const toggleLock = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, isLock: !u.isLock } : u))
    );
    // Also update filteredUsers for UI update
    setFilteredUsers((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, isLock: !u.isLock } : u))
    );
    toast.success("Lock status changed successfully");
  };

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data); // Initially show all
      })
      .catch(() => {
        toast.error("Failed to get users data!!!");
      });
  }, []);

  // Filter logic
  const applyFilters = ({ search, role, isLock }) => {
    setFilters({ search, role, isLock });

    let filtered = [...users];

    if (search && search.trim() !== "") {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s) ||
          u.fullName.toLowerCase().includes(s)
      );
    }

    if (role) {
      filtered = filtered.filter((u) => u.role === role);
    }

    if (isLock !== null && isLock !== undefined) {
      filtered = filtered.filter((u) => u.isLock === isLock);
    }

    setFilteredUsers(filtered);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      role: null,
      isLock: null,
    });
    setFilteredUsers(users);
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
          <IdcardOutlined /> Full Name
        </>
      ),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: (
        <>
          <UserSwitchOutlined /> Role
        </>
      ),
      dataIndex: "role",
      key: "role",
      render: (role) => <UserRoleTag value={role} />,
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
          icon={record.isLock ? <LockOutlined /> : <UnlockOutlined />}
          danger={record.isLock}
          onClick={() => toggleLock(record.userId)}
        />
      ),
    },
  ];

  return (
    <div className="w-full flex flex-row">
      <div className="w-1/5">
        <UserSideFilter onApply={applyFilters} onReset={resetFilters} />
      </div>
      <div className="w-4/5 h-screen overflow-y-auto">
        <Table
          rowKey="userId"
          dataSource={filteredUsers}
          columns={columns}
          pagination={{ pageSize: 20 }}
          bordered
          className="rounded-none"
        />
      </div>
    </div>
  );
}
