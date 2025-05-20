import React from "react";

import "../layout.css";
import NotificationCard from "../../components/noti/NotificationCard";
export default function NotificationPage() {
  const notifications = [
    {
      notification_id: 1,
      message: "Your pet Max has a grooming appointment tomorrow at 10 AM.",
      notification_type: "Grooming",
      sent_at: "2025-05-14T08:00:00Z",
      is_read: false,
    },
    {
      notification_id: 2,
      message: "Vaccination due for Bella next week.",
      notification_type: "HealthAlert",
      sent_at: "2025-05-13T10:00:00Z",
      is_read: true,
    },
    {
      notification_id: 3,
      message: "Your boarding booking has been confirmed.",
      notification_type: "Boarding",
      sent_at: "2025-05-12T15:30:00Z",
      is_read: false,
    },
    {
      notification_id: 4,
      message: "Reminder: appointment for Luna on Friday.",
      notification_type: "Appointment",
      sent_at: "2025-05-11T09:00:00Z",
      is_read: true,
    },
  ];

  return (
    <div className=" outlet-layout m-0 overflow-y-auto">
      <div className="mx-auto px-4 py-6">
        <h2 className="text-2xl logo font-bold mb-8">🔔 Notifications</h2>
        {notifications.map((noti) => (
          <NotificationCard key={noti.notification_id} notification={noti} />
        ))}
      </div>
    </div>
  );
}
