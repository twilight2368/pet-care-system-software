import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { FaPlus } from "react-icons/fa6";

export default function AddRoomModal({ onAdd, existingRoomNumbers }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setVisible(true);
  const closeModal = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const roomNum = Number(values.room_number);
      if (existingRoomNumbers.includes(roomNum)) {
        message.error("Room number already exists!");
        return;
      }
      onAdd({
        room_number: roomNum,
        is_available: values.is_available ?? true,
      });
      closeModal();
    });
  };

  return (
    <>
      <Button type="primary" size="large" icon={<FaPlus />} onClick={openModal}>
        Add Room
      </Button>

      <Modal
        title="Add New Room"
        visible={visible}
        onCancel={closeModal}
        onOk={handleOk}
        okText="Add Room"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ is_available: true }}
        >
          <Form.Item
            label="Room Number"
            name="room_number"
            rules={[
              { required: true, message: "Please input the room number!" },
              {
                pattern: /^[0-9]+$/,
                message: "Room number must be a positive integer!",
              },
            ]}
          >
            <Input placeholder="Enter room number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
