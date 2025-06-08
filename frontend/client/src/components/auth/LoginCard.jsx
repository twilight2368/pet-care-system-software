import React from "react";
import { Form, Input, Button, Card } from "antd";
import { Link, useNavigate } from "react-router";
import { loginPawPal } from "../../apis/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken, setUserId, setUserInfo } from "../../app/store/UserSlice";
export default function LoginCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Login Info:", values);
    loginPawPal(values)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");

        const user_res = res.data;
        dispatch(setUserId(user_res?.user?.userId || ""));
        dispatch(setUserInfo(user_res?.user || null));
        dispatch(setToken(user_res?.jwt?.token || ""));

        toast.success("Login successful");
        navigate("/home");
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        toast.error("SOMETHING WENT WRONG!!!");
      });
  };
  return (
    <>
      <Card
        title="🐾 Welcome Back"
        className="w-full h-full shadow-xl rounded-xl"
      >
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email Address or Username"
            name="username"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="rounded-md"
            >
              Login
            </Button>
          </Form.Item>

          <div className="text-center mt-2">
            <span className="text-gray-600">Don’t have an account? </span>
            <Link to="/register" className=" hover:underline">
              Register now
            </Link>
          </div>
        </Form>
      </Card>
    </>
  );
}
