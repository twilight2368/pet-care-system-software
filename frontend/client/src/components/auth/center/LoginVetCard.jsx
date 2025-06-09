import React from "react";
import { Form, Input, Button, Card, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { loginPawPal } from "../../../apis/api";
import { useDispatch } from "react-redux";
import {
  clearUserInfo,
  setToken,
  setUserId,
  setUserInfo,
} from "../../../app/store/UserSlice";
import { useNavigate } from "react-router";
const { Option } = Select;

export default function LoginVetCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    loginPawPal(values)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");

        const user_res = res.data;
        dispatch(setUserId(user_res?.user?.userId || ""));
        dispatch(setUserInfo(user_res?.user || null));
        dispatch(setToken(user_res?.jwt?.token || ""));

        const role = user_res?.user?.role;

        switch (role) {
          case "VETERINARIAN":
            toast.success(`Logged in as ${role}`);
            navigate("vet");
            break;
          case "STAFF":
            toast.success(`Logged in as ${role}`);
            navigate("staff");
            break;
          case "ADMIN":
            toast.success(`Logged in as ${role}`);
            navigate("admin");
            break;
          default:
            toast.error("Unknown role");
            dispatch(clearUserInfo());
            navigate("/");
            break;
        }
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        toast.error("SOMETHING WENT WRONG!!!");
      });
  };

  return (
    <Card title="Center Login" className="mx-auto  w-full shadow-md">
      <Form
        name="login_form"
        layout="vertical"
        initialValues={{ role: "Veterinarian" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Username Or Email"
          rules={[
            { required: true, message: "Please input your username or email!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
