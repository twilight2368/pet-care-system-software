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
import { registerPawPal } from "../../../apis/api";

const { Option } = Select;

export default function RegisterVetCard({ setIsRegistering }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Registering user:", values);

    registerPawPal(values)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        toast.success(`Registered as ${res.data?.role}`);
        setIsRegistering(false);
      })
      .catch(() => {
        toast.error("Register failed");
      });
  };

  return (
    <Card title="Center Register" className="w-full mx-auto shadow-md">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: "VETERINARIAN" }}
      >
        <Form.Item
          name="fullName"
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
            rules={[
              { required: true, message: "Please enter phone number" },
              { pattern: /^\d{9,12}$/, message: "Enter a valid phone number" },
            ]}
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
              <Option value="VETERINARIAN">Veterinarian</Option>
              <Option value="STAFF">Staff</Option>
              <Option value="ADMIN">Admin</Option>
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
