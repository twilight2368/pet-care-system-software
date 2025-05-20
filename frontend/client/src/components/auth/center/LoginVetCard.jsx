import React from "react";
import { Form, Input, Button, Card, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Option } = Select;

export default function LoginVetCard({ onLogin }) {
  const onFinish = (values) => {
    if (values.role === "PetOwner") {
      toast.error("PetOwners are not allowed to log in here.");
      return;
    }

    // Handle login logic here
    console.log("Logging in:", values);
    toast.success(`Logged in as ${values.role}`);
    onLogin?.(values); // Optional callback
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
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
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

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select>
            <Option value="Veterinarian">Veterinarian</Option>
            <Option value="Admin">Admin</Option>
            <Option value="Staff">Staff</Option>
          </Select>
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
