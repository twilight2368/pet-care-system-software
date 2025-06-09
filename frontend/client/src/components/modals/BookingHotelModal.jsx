import React, { useEffect, useState } from "react";
import { Button, Modal, Form, DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { createBoardingBooking, getPetByUser, getRooms } from "../../apis/api";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function BookingHotelModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form] = Form.useForm();

  const user_id = useSelector((state) => state.user.user_id);
  const user = useSelector((state) => state.user.user_info);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleFinish = (values) => {
    const [checkInDate, checkOutDate] = values.date_range;

    console.log("====================================");
    console.log(values.pet);
    console.log("====================================");

    const selectedPet = pets.find((pet) => pet.petId === values.pet);
    const selectedRoom = rooms.find((room) => room.roomId === values.room);
    const bookingPayload = {
      pet: selectedPet,
      owner: user,
      staff: null,
      checkInDate: dayjs(checkInDate).toISOString(),
      checkOutDate: dayjs(checkOutDate).toISOString(),
      status: "PENDING",
      room: selectedRoom || null,
      notesFromClient: values.notes_from_client || "",
    };

    console.log("Booking Submitted:", bookingPayload);
    createBoardingBooking(bookingPayload)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        toast.success("Booking successful");
        form.resetFields();
        handleCancel();
      })
      .catch(() => {
        toast.error("Something went wrong!!!");
      });
  };

  useEffect(() => {
    getPetByUser(user_id)
      .then((res) => {
        setPets(res.data);
      })
      .catch(() => {
        toast.error("Error fetching pets data");
      });
  }, [user_id]);

  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data);
      })
      .catch(() => {
        toast.error("Error fetching rooms data");
      });
  }, []);

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
            name="pet"
            label="Select Pet"
            rules={[{ required: true, message: "Please select a pet" }]}
          >
            <Select placeholder="Choose a pet">
              {pets.map((p) => (
                <Option key={p.petId} value={p.petId}>
                  {p.name}
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

          <Form.Item name="room" label="Select Room (Optional)">
            <Select placeholder="Choose a room">
              {rooms.map((r) => (
                <Option key={r.roomId} value={r.roomId}>
                  {r.roomNumber} - {r.roomType}
                </Option>
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
