import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createPet } from "../../apis/api";

const { Option } = Select;

export default function AddPetPage() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const user = useSelector((state) => state.user.user_info);

  const onFinish = async (values) => {
    const newPet = {
      owner: user,
      name: values.name,
      age: values.age,
      gender: values.gender.toUpperCase(), // Ensure format is "MALE", "FEMALE", etc.
      breed: values.breed || "",
      color: values.color || "",
    };

    console.log("Pet object to save:", newPet);

    createPet(newPet)
      .then((res) => {
        console.log("====================================");
        console.log("Data", res.data);
        console.log("====================================");
        toast.success("Pet added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        form.resetFields();
      })
      .catch(() => {
        toast.error("Oop!");
      });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Only keep the latest file
  };

  return (
    <div className="py-6 px-60 w-full outlet-layout m-0 overflow-y-auto">
      <div className="text-2xl logo mb-6 text-center">
        🐾 Add new pet profile
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={{ gender: "UNKNOWN" }}
      >
        <Form.Item
          label="Pet Name"
          name="name"
          rules={[{ required: true, message: "Please enter pet name" }]}
        >
          <Input placeholder="Enter pet name" />
        </Form.Item>

        <Form.Item label="Age" name="age">
          <InputNumber min={0} className="w-full" placeholder="Enter age" />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select>
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
            <Option value="UNKNOWN">Unknown</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Breed" name="breed">
          <Input placeholder="Enter breed" />
        </Form.Item>

        <Form.Item label="Color" name="color">
          <Input placeholder="Enter color" />
        </Form.Item>

        <Form.Item label="Upload Photo" name="photo">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUploadChange}
            maxCount={1}
            listType="picture"
            disabled
          >
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Pet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
