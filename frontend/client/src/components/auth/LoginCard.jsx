import React from "react";
import { Form, Input, Button, Card } from "antd";
import { Link, useNavigate } from "react-router";

export default function LoginCard() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Login Info:", values);
    // Handle login logic here
  };
  return (
    <>
      <Card
        title="🐾 Welcome Back"
        className="w-full h-full shadow-xl rounded-xl"
      >
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
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
              onClick={() => {
                navigate("/home");
              }}
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
