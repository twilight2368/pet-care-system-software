import React, { useState } from "react";
import { Form, Input, Button, Card, Modal } from "antd";
import { toast } from "react-toastify";

export default function UserInfoCard({ user }) {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const handleSave = (values) => {
    console.log("Updated user info:", values);
    toast.success("Information updated successfully");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(user);
  };

  return (
    <Card
      title={<div className=" logo text-2xl">👤 User Information</div>}
      className=" w-full mx-auto my-8 "
      extra={
        <Button variant="link" onClick={() => setPasswordModalOpen(true)}>
          Change Password
        </Button>
      }
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={user}
        onFinish={handleSave}
        disabled={!isEditing}
      >
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter username" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Invalid email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <div className="flex flex-row justify-center items-center gap-2 mt-4">
          {!isEditing ? (
            <></>
          ) : (
            <>
              <Button type="primary" htmlType="submit">
                Save profile
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          )}
        </div>
      </Form>
      <div className="flex justify-center items-center gap-2">
        {!isEditing ? (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            Edit profile
          </Button>
        ) : (
          <></>
        )}
      </div>
      {/* Change Password Modal */}
      <Modal
        title={<div className=" logo text-2xl mb-4">Change password</div>}
        open={passwordModalOpen}
        onCancel={() => setPasswordModalOpen(false)}
        footer={null}
      >
        <ChangePasswordForm onClose={() => setPasswordModalOpen(false)} />
      </Modal>
    </Card>
  );
}

function ChangePasswordForm({ onClose }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Changing password with:", values);
    toast.success("Password changed successfully");
    onClose();
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        label="Current Password"
        name="current_password"
        rules={[{ required: true, message: "Enter current password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="new_password"
        rules={[{ required: true, message: "Enter new password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm_password"
        dependencies={["new_password"]}
        rules={[
          { required: true, message: "Confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("new_password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </div>
    </Form>
  );
}
