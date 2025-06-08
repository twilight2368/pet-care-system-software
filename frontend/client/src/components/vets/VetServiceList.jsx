import React from "react";
import { Button, Table, Tag } from "antd";
import dayjs from "dayjs";
import { AppointmentTypeTag, ServiceStatusTag } from "../tags/CustomTags";

const columns = [
  {
    title: "Pet",
    dataIndex: ["pet", "name"],
    key: "pet.name",
    render: (name) => name || "-",
  },
  {
    title: "Vet",
    dataIndex: ["veterinarian", "fullName"],
    key: "veterinarian.fullName",
    render: (name) => name || "-",
  },
  {
    title: "Date",
    dataIndex: "appointmentDate",
    key: "appointmentDate",
    render: (date) => dayjs(date).add(7, "hour").format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "Type",
    dataIndex: "appointmentType",
    key: "appointmentType",
    render: (type) => <AppointmentTypeTag value={type} />,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <ServiceStatusTag value={status} />,
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    render: (text) => (
      <span className="text-xs text-gray-400">{text || "-"}</span>
    ),
    ellipsis: true,
  },
  {
    title: "Notes from you",
    dataIndex: "notesFromClient",
    key: "notesFromClient",
    render: (text) => (
      <span className="text-xs text-gray-400">{text || "-"}</span>
    ),
    ellipsis: true,
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="primary" danger>
        Cancel
      </Button>
    ),
  },
];

export default function VetServiceList({ data }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">🗓️ Appointments</h2>
      <Table
        rowKey="appointmentId"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
