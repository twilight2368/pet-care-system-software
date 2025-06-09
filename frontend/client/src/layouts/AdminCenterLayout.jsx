import React from "react";
import { Outlet, useNavigate } from "react-router";
import { Button, Divider } from "antd";
import SimpleHeader from "../components/headers/SimpleHeader";
import StaffCenterMenu from "../components/menus/StaffCenterMenu";
import AdminCenterMenu from "../components/menus/AdminCenterMenu";
import { useDispatch, useSelector } from "react-redux";
import UnauthorizedPage from "../pages/unathorized/UnauthorizedPage";
import { clearUserInfo } from "../app/store/UserSlice";
import { toast } from "react-toastify";
export default function AdminCenterLayout() {
  const user = useSelector((state) => state.user.user_info);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(clearUserInfo());
    navigate("/center");
    toast.success("LOGOUT SUCCESSFUL");
  };
  return (
    <>
      {user ? (
        <>
          <div className="w-full min-h-screen flex flex-row justify-between gap-2">
            <div className="w-1/6 h-screen flex flex-col justify-start items-center flex-nowrap overflow-y-auto">
              <div className="w-full flex justify-center items-center mt-3 mb-3">
                <SimpleHeader />
              </div>
              <div className=" w-full px-auto mb-2">
                <AdminCenterMenu />
              </div>
              <div className="w-full px-1">
                <Button
                  className="w-full"
                  variant="filled"
                  color="danger"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </div>
            <div className="w-5/6 h-screen overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <>
          <UnauthorizedPage />
        </>
      )}
    </>
  );
}
