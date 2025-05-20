import React, { useState } from "react";

import "../layout.css";
import Footer from "../../components/footers/Footer";
import UserInfoCard from "../../components/user/UserInfoCard";
export default function UserInfoCardPage() {
  return (
    <div className="p-6 outlet-layout m-0 overflow-y-auto">
      <div className=" min-h-96 w-1/2 mx-auto flex justify-center items-center">
        <UserInfoCard
          user={{
            full_name: "Jane Doe",
            username: "janedoe",
            email: "jane@example.com",
            phone: "123-456-7890",
          }}
        />
      </div>
      <Footer />
    </div>
  );
}
