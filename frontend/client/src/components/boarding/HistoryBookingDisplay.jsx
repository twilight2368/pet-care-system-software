import React from "react";
import { Card, Table, Tag } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router";

const table_columns = [
  {
    title: "Room",
    dataIndex: "room_number",
    key: "Room",
  },
  {
    title: "Pet",
    dataIndex: "pet",
    key: "Pet",
    render: (text) => (
      <span className=" text-xs text-gray-400">{text || "-"}</span>
    ),
    ellipsis: true,
  },
  {
    title: "Check-in",
    dataIndex: "check_in_date",
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
  },
  {
    title: "Check-out",
    dataIndex: "check_out_date",
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
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
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Tag
        color={
          status === "Pending"
            ? "orange"
            : status === "Completed"
            ? "green"
            : "red"
        }
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "",
    dataIndex: "booking_id",
    key: "Booking Id",
    render: (booking_id) => (
      <Link to={"bookings/" + booking_id}>See details</Link>
    ),
  },
];
export default function HistoryBookingDisplay({ bookingHistory }) {
  return (
    <>
      {/* Booking History */}
      <Card title="Booking History" variant="borderless">
        <Table
          rowKey="booking_id"
          dataSource={bookingHistory}
          pagination={{ pageSize: 10 }}
          columns={table_columns}
        />
      </Card>
    </>
  );
}
