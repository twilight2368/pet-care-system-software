import React, { useEffect, useState } from "react";

export default function DashboardHeaderDisplay() {
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="text-xl font-semibold m-2 flex justify-between items-center bg-white">
      <div>{getGreeting()}, welcome back! 👋</div>
      <div className="text-sm text-gray-500">{time.toLocaleTimeString()}</div>
    </div>
  );
}
