import React, { useState } from "react";
import { Button, Modal, Form, DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const dummyRooms = [
  { room_id: 1, room_number: "A101" },
  { room_id: 2, room_number: "A102" },
];
const pets = [
  { id: 1, name: "Fluffy" },
  { id: 2, name: "Bella" },
  { id: 3, name: "Max" },
];

export default function BookingHotelModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleFinish = (values) => {
    console.log("Booking Submitted:", values);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" className="mt-4" onClick={showModal}>
        Book New Stay
      </Button>
      <Modal
        title="New Boarding Booking"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="pet_id"
            label="Select Pet"
            rules={[{ required: true, message: "Please select your pet" }]}
          >
            <Select placeholder="Choose your pet">
              {pets.map((pet) => (
                <Option key={pet.id} value={pet.id}>
                  {pet.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date_range"
            label="Booking Dates"
            rules={[{ required: true, message: "Please select dates" }]}
          >
            <RangePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item name="room_id" label="Room" rules={[{ required: true }]}>
            <Select placeholder="Select Room">
              {dummyRooms.map((room) => (
                <Select.Option key={room.room_id} value={room.room_id}>
                  {room.room_number}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="notes_from_client" label="Notes">
            <Input.TextArea placeholder="Any special instructions?" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Booking
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
