import React from "react";
import { Button, Table, Tag } from "antd";
import dayjs from "dayjs";

const columns = [
  {
    title: "Pet",
    dataIndex: "pet_id",
    key: "pet_id",
  },
  {
    title: "Vet",
    dataIndex: "veterinarian_id",
    key: "veterinarian_id",
  },
  {
    title: "Date",
    dataIndex: "appointment_date",
    key: "appointment_date",
    render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "Type",
    dataIndex: "appointment_type",
    key: "appointment_type",
    render: (type) => <Tag color="blue">{type}</Tag>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const color =
        status === "Pending"
          ? "orange"
          : status === "Completed"
          ? "green"
          : "red";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    render: (text) => (
      <span className=" text-xs text-gray-400">{text || "-"}</span>
    ),
    ellipsis: true,
  },
  {
    title: "Notes from you",
    dataIndex: "note_from_client",
    key: "note_from_client",
    render: (text) => (
      <span className=" text-xs text-gray-400">{text || "-"}</span>
    ),
    ellipsis: true,
  },
  {
    dataIndex: "cancel-column",
    key: "cancel-column",
    render: () => (
      <Button variant="filled" color="danger">
        Cancel
      </Button>
    ),
  },
];

export default function VetServiceList({ data }) {
  return (
    <div className="p-4 ">
      <h2 className="text-xl font-semibold mb-4">🗓️ Appointments</h2>
      <Table
        rowKey="appointment_id"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
