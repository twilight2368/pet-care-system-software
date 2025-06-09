import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Switch, Select } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserById } from "../../apis/api";
import { setUserInfo } from "../../app/store/UserSlice";
const { Option } = Select;

export default function UserInfoCard() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.user.user_info);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleSave = (values) => {
    const updateUserData = { ...user, ...values };

    updateUserById(user.userId, updateUserData)
      .then((res) => {
        dispatch(setUserInfo(res.data));
        toast.info("Updated data");
      })
      .catch((err) => {
        toast.error("Failed to update data");
      });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(user);
  };

  return (
    <Card
      title={<div className="logo text-2xl">👤 User Information</div>}
      className="w-full mx-auto my-8"
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSave}
        initialValues={user}
        disabled={!isEditing}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
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

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>

        <div className="flex flex-row justify-center items-center gap-2 mt-4">
          {isEditing && (
            <>
              <Button type="primary" htmlType="submit">
                Save Profile
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          )}
        </div>
      </Form>

      {!isEditing && (
        <div className="flex justify-center items-center gap-2">
          <Button type="primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </div>
      )}
    </Card>
  );
}
