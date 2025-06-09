import React from "react";
import { Button, Table, Tag } from "antd";
import dayjs from "dayjs";
import {
  ServiceStatusTag,
  GroomingServiceTypeTag,
  RecurrencePatternTag,
} from "../../components/tags/CustomTags";

export default function GroomingServiceList({ data }) {
  const columns = [
    {
      title: "Service Date",
      dataIndex: "serviceDate",
      key: "serviceDate",
      render: (date) => dayjs(date).add(7, "hour").format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Pet",
      dataIndex: "pet",
      key: "pet",
      render: (pet) => <Tag color="blue">{pet.name}</Tag>,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (type) => <GroomingServiceTypeTag value={type} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <ServiceStatusTag value={status} />,
    },
    {
      title: "Recurring",
      dataIndex: "recurrencePattern",
      key: "recurrencePattern",
      render: (pattern) =>
        pattern ? (
          <RecurrencePatternTag value={pattern} />
        ) : (
          <Tag>One-time</Tag>
        ),
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
        <div className="flex justify-center items-center">
          <Button type="primary" danger>
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
        rowKey="groomingId"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
