import React from "react";
import { Card, Table} from "antd";
import dayjs from "dayjs";
import { ServiceStatusTag } from "../tags/CustomTags";

const table_columns = [
  {
    title: "Room",
    dataIndex: ["room", "roomNumber"],
    key: "room",
  },
  {
    title: "Pet",
    dataIndex: ["pet", "name"],
    key: "pet",
    render: (text) => (
      <span className="text-xs text-gray-400">{text || "-"}</span>
    ),
    ellipsis: true,
  },
  {
    title: "Staff",
    dataIndex: ["staff", "fullName"],
    key: "staff",
    render: (text) => (
      <span className="text-xs text-gray-400">{text || "-"}</span>
    ),
    ellipsis: true,
  },
  {
    title: "Check-in",
    dataIndex: "checkInDate",
    render: (date) => dayjs(date).add(7, "h").format("YYYY-MM-DD"),
  },
  {
    title: "Check-out",
    dataIndex: "checkOutDate",
    render: (date) => dayjs(date).add(7, "h").format("YYYY-MM-DD"),
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
    title: "Status",
    dataIndex: "status",
    render: (status) => <ServiceStatusTag value={status} />,
  },
];

export default function HistoryBookingDisplay({ bookingHistory }) {
  return (
    <Card title="Booking History" variant="borderless">
      <Table
        rowKey="bookingId"
        dataSource={bookingHistory}
        pagination={{ pageSize: 10 }}
        columns={table_columns}
      />
    </Card>
  );
}
