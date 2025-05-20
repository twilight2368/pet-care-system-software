import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, Upload, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Option } = Select;

export default function AddPetPage() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    console.log("Pet info submitted:", values);
    toast.success("Pet added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Only keep the latest file
  };

  return (
    <>
      {" "}
      <div className="py-6 px-60 w-full outlet-layout m-0 overflow-y-auto">
        <div className=" text-2xl logo mb-6 text-center">
          🐾 Add new pet profile
        </div>
        <Form
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          initialValues={{ gender: "Unknown" }}
        >
          <Form.Item
            label="Pet Name"
            name="name"
            rules={[{ required: true, message: "Please enter pet name" }]}
          >
            <Input placeholder="Enter pet name" />
          </Form.Item>

          <Form.Item label="Age" name="age" className="w-full">
            <InputNumber min={0} className="w-full" placeholder="Enter age" />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Unknown">Unknown</Option>
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
    </>
  );
}
