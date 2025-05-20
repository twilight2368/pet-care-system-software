import React from "react";
import { Form, Input, Button, Card, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const { Option } = Select;

export default function RegisterVetCard({ onRegister }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Registering user:", values);
    toast.success(`Registered as ${values.role}`);
    onRegister?.(values); // Optional callback
  };

  return (
    <Card title="Center Register" className="w-full mx-auto shadow-md">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: "Veterinarian" }}
      >
        <Form.Item
          name="full_name"
          label="Full Name"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input placeholder="Full Name" prefix={<IdcardOutlined />} />
        </Form.Item>

        <div className="flex flex-row gap-2">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter username" }]}
            className="w-1/2"
          >
            <Input placeholder="Username" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
            className="w-1/2"
          >
            <Input.Password placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>
        </div>

        <div className="flex flex-row gap-2">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
            className="w-1/2"
          >
            <Input placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
            className="w-1/2"
          >
            <Input placeholder="Phone Number" prefix={<PhoneOutlined />} />
          </Form.Item>
        </div>

        <div className="flex flex-row justify-between items-center gap-2">
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
            className="w-1/3"
          >
            <Select>
              <Option value="Veterinarian">Veterinarian</Option>
              <Option value="Staff">Staff</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="specialization"
            label="Specialization (if any)"
            className="w-2/3"
          >
            <Input
              placeholder="Optional - e.g. Surgery, Nutrition"
              prefix={<AppstoreAddOutlined />}
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
