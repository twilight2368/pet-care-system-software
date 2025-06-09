import React, { useState } from "react";
import { Form, Input, InputNumber, Select, Upload, Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { updatePetById } from "../../apis/api";

const { Option } = Select;

export default function EditPetModal({ pet }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  const handleFinish = (values) => {
    const updatedPet = {
      ...pet,
      ...values,
      photoUrl: fileList[0]?.originFileObj || pet?.photoUrl,
    };

    // console.log("====================================");
    // console.log(updatedPet);
    // console.log("====================================");
    updatePetById(pet.petId, updatedPet)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        toast.success("Pet information updated!");
      })
      .catch(() => {
        toast.error("Failed to update pet");
      });
  };

  return (
    <>
      <Button type="default" onClick={() => setOpen(true)}>
        Edit Pet
      </Button>

      <Modal
        title={<div className="logo text-xl mb-6">Edit pet information</div>}
        open={open}
        closable
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="horizontal"
          onFinish={handleFinish}
          variant="filled"
          initialValues={{
            name: pet?.name,
            age: pet?.age,
            gender: pet?.gender,
            breed: pet?.breed,
            color: pet?.color,
          }}
        >
          <Form.Item
            label="Pet Name"
            name="name"
            rules={[{ required: true, message: "Please enter pet name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Age" name="age">
            <InputNumber className="w-full" min={0} />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select>
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
              <Option value="UNKNOWN">Unknown</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Breed" name="breed">
            <Input />
          </Form.Item>

          <Form.Item label="Color" name="color">
            <Input />
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
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
