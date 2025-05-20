import React from "react";
import {
  BellOutlined,
  CalendarOutlined,
  ScissorOutlined,
  HomeOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import dayjs from "dayjs";
import { Button } from "antd";

const typeMap = {
  Appointment: {
    icon: <CalendarOutlined />,
    color: " text-blue-600",
  },
  Grooming: {
    icon: <ScissorOutlined />,
    color: " text-pink-600",
  },
  Boarding: {
    icon: <HomeOutlined />,
    color: " text-purple-600",
  },
  HealthAlert: {
    icon: <ExclamationCircleOutlined />,
    color: " text-red-600",
  },
  Other: {
    icon: <BellOutlined />,
    color: " text-gray-600",
  },
};

export default function NotificationCard({ notification }) {
  const { message, notification_type, sent_at, is_read } = notification;
  const { icon, color } = typeMap[notification_type] || typeMap.Other;

  return (
    <div
      className={classNames(
        "flex gap-3 p-6 rounded-md shadow-sm mb-3",
        is_read ? " opacity-25 " : " opacity-100"
      )}
    >
      <div className={classNames("text-xl p-2 rounded-full", color)}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{message}</p>
        <p className="text-xs italic text-gray-400">
          {dayjs(sent_at).format("D MMM YYYY - h:mm A")}
        </p>
      </div>
      <div>
        <Button
          variant="filled"
          color="geekblue"
          disabled={is_read}
          icon={<CheckOutlined />}
        >
          Mark as read
        </Button>
      </div>
    </div>
  );
}
