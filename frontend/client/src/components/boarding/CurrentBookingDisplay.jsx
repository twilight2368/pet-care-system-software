import React from "react";
import { Carousel, Card, Tag, Button } from "antd";
import dayjs from "dayjs";
import "../custom.css";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
export default function CurrentBookingDisplay({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <div className=" flex justify-center items-center">
          <p>No current bookings available.</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Carousel dots arrows fade className="w-full h-64">
        {bookings.map((booking, index) => (
          <div key={index} className="p-0 px-6 h-60 w-full">
            <div className=" h-full w-full bg-white  p-6">
              <div className="mb-2">
                {" "}
                <h2 className="text-lg font-semibold mb-2">
                  Room: {booking.room_number}
                </h2>
                <p>
                  <strong>Check-in:</strong>{" "}
                  {dayjs(booking.check_in_date).format("YYYY-MM-DD")}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {dayjs(booking.check_out_date).format("YYYY-MM-DD")}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <Tag
                    color={
                      booking.status === "Pending"
                        ? "orange"
                        : booking.status === "Completed"
                        ? "green"
                        : "red"
                    }
                  >
                    {booking.status}
                  </Tag>
                </p>
              </div>
              <div className="w-full">
                <Link to="bookings/id">See details ...</Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
