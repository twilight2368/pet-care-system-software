import React from "react";
import { Card, Progress } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import classNames from "classnames";
import BookingHotelModal from "../modals/BookingHotelModal";

export default function AvailableRoomsCard({ available = 0, total = 10 }) {
  const percent = total > 0 ? Math.round((available / total) * 100) : 0;

  const status = percent < 30 ? "low" : percent < 60 ? "medium" : "high";

  const textColor = classNames({
    "text-red-600": status === "low",
    "text-yellow-600": status === "medium",
    "text-green-600": status === "high",
  });

  const bgColor = classNames({
    "bg-red-200": status === "low",
    "bg-yellow-200": status === "medium",
    "bg-green-200": status === "high",
  });

  const strokeColor = {
    low: "#f5222d",
    medium: "#faad14",
    high: "#52c41a",
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-60">
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex flex-row gap-3 items-center justify-center">
            {" "}
            <p className={classNames("text-6xl logo font-bold", textColor)}>
              {available} / {total}
            </p>
            <HomeOutlined className={classNames("text-2xl", textColor)} />
          </div>
          <Progress
            percent={percent}
            showInfo={false}
            strokeColor={strokeColor[status]}
            className="mt-2"
          />
          <div className="flex justify-center items-center">
            <BookingHotelModal />
          </div>
        </div>
      </div>
    </>
  );
}
