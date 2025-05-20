import React from "react";
import { Form, Input, Button, Card } from "antd";
import { Link } from "react-router";

const RegisterCard = () => {
  const onFinish = (values) => {
    console.log("Register Info:", values);
    // Handle registration logic here
  };

  return (
    <Card
      title="🐾 Register New Account"
      className="w-full h-full shadow-lg rounded-xl"
    >
      <Form
        name="register"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="JohnDoe123" />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Invalid email format!" },
          ]}
        >
          <Input placeholder="john@example.com" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number!" },
            { pattern: /^\d{9,12}$/, message: "Enter a valid phone number" },
          ]}
        >
          <Input placeholder="e.g., 0912345678" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password!" }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="rounded-md">
            Register
          </Button>
        </Form.Item>
        <div className=" text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to={"/login"} className=" hover:underline">
            Login now
          </Link>
        </div>
      </Form>
    </Card>
  );
};

export default RegisterCard;
