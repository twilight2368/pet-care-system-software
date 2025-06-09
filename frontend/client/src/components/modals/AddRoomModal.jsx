import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { FaPlus } from "react-icons/fa6";
import { addRoom } from "../../apis/api";
import { toast } from "react-toastify";

const { Option } = Select;

export default function AddRoomModal({ existingRoomNumbers = [] }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setVisible(true);

  const closeModal = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { room_number, room_type } = values;

      // Check for duplicate room number
      if (existingRoomNumbers.includes(room_number)) {
        message.error("Room number already exists!");
        return;
      }

      const newRoom = {
        roomNumber: room_number,
        roomType: room_type,
      };

      addRoom(newRoom)
        .then((res) => {
          console.log("====================================");
          console.log(res.data);
          console.log("====================================");
          toast.success("Add room success");
        })
        .catch(() => {
          toast.success("Add room failed");
        });
    });
  };

  return (
    <>
      <Button
        variant="text"
        type="text"
        color="blue"
        size="small"
        icon={<FaPlus />}
        onClick={openModal}
      >
        Add Room
      </Button>

      <Modal
        title="Add New Room"
        open={visible}
        onCancel={closeModal}
        onOk={handleOk}
        okText="Add Room"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ room_type: "STANDARD" }}
        >
          <Form.Item
            label="Room Number"
            name="room_number"
            rules={[
              { required: true, message: "Please input the room number!" },
            ]}
          >
            <Input placeholder="Enter room number" />
          </Form.Item>

          <Form.Item
            label="Room Type"
            name="room_type"
            rules={[{ required: true, message: "Please select a room type!" }]}
          >
            <Select>
              <Option value="STANDARD">Standard</Option>
              <Option value="VIP">VIP</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
