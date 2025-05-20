import React from "react";
import { Button, Table, Tag } from "antd";
import dayjs from "dayjs";

export default function GroomingServiceList({ data }) {
  const columns = [
    {
      title: "Service Date",
      dataIndex: "service_date",
      key: "service_date",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Pet",
      dataIndex: "pet_id",
      key: "pet_id",
      render: () => (
        <>
          <Tag>Pet name</Tag>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Recurring",
      dataIndex: "is_recurring",
      key: "is_recurring",
      render: (recurring, record) =>
        recurring ? (
          <Tag color="blue">{record.recurrence_pattern}</Tag>
        ) : (
          <Tag>One-time</Tag>
        ),
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
      dataIndex: "is_recurring",
      key: "is_recurring",
      render: () => (
        <div className="flex justify-center items-center">
          <Button type="primary" variant="filled" color="danger">
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-6 px-0">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="grooming_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
