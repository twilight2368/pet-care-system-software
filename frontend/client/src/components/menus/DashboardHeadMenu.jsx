import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../../app/store/UserSlice";

export default function DashboardHeadMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUserInfo());
    navigate("/");
    toast.success("LOGOUT SUCCESSFUL");
  };

  const handleClick = ({ key }) => {
    if (key === "settings") {
      navigate("/home/settings");
    } else if (key === "logout") {
      logout()
    }
  };

  const items = [
    {
      label: (
        <span className="flex items-center gap-2">
          <IoIosSettings />
          Settings
        </span>
      ),
      key: "settings",
    },
    {
      label: (
        <span className="text-red-500 flex items-center gap-2 hover:text-white">
          <FiLogOut />
          Logout
        </span>
      ),
      key: "logout",
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items, onClick: handleClick }}
      placement="bottom"
      trigger={["click"]}
    >
      <Button
        type="text"
        className="text-gray-900 logo hover:text-blue-600"
        icon={<FaUser />}
      >
        My Account
      </Button>
    </Dropdown>
  );
}
