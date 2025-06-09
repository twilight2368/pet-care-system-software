import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { createGroomingServiceBooking, getPetByUser } from "../../apis/api";
import { data } from "autoprefixer";

const { Option } = Select;

export default function GroomingForm() {
  const [form] = Form.useForm();
  const [pets, setPets] = useState([]);

  const user_id = useSelector((state) => state.user.user_id);
  const user = useSelector((state) => state.user.user_info);

  useEffect(() => {
    getPetByUser(user_id)
      .then((res) => {
        setPets(res.data);
      })
      .catch(() => {
        toast.error("Failed getting pet info");
      });
  }, [user_id, user]);

  const handleFinish = async (values) => {
    // Log the values for now
    // If you need the full pet object:
    const selectedPet = pets.find((pet) => pet.petId === values.pet);
    console.log("Selected pet:", selectedPet);
    values = {
      ...values,
      pet: selectedPet,
      owner: user,
      serviceDate: values.serviceDate.toISOString(),
    };

    createGroomingServiceBooking(values)
      .then((res) => {
        toast.success("Enroll successfully");
        form.resetFields();
      })
      .catch(() => {
        toast.error("Something went wrong!!!");
      });
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded shadow">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          recurrencePattern: "NONE",
          serviceType: "BATH_AND_TRIM",
        }}
      >
        <Form.Item
          name="pet"
          label="Select Pet"
          rules={[{ required: true, message: "Please select your pet" }]}
        >
          <Select placeholder="Choose your pet">
            {pets.map((pet) => (
              <Option key={pet.petId} value={pet.petId}>
                {pet?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="serviceDate"
          label="Service Date & Time"
          rules={[{ required: true, message: "Please pick a date and time" }]}
        >
          <DatePicker
            showTime={{
              format: "HH:mm",
              defaultValue: dayjs("00:00", "HH:mm"),
              showSecond: false,
              hourStep: 1,
              minuteStep: 5,
              hideDisabledOptions: true,
              disabledHours: () => [
                ...Array(6).keys(), // Disable hours 0-5
                ...Array.from({ length: 6 }, (_, i) => i + 18), // Disable hours 18-23
              ],
            }}
            format="YYYY-MM-DD HH:mm"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="serviceType"
          label="Service Type"
          rules={[{ required: true, message: "Please select a service type" }]}
        >
          <Select>
            <Option value="BATH_AND_TRIM">Bath and Trim</Option>
            <Option value="SPA">Spa</Option>
          </Select>
        </Form.Item>

        <Form.Item name="notesFromClient" label="Notes (Optional)">
          <Input.TextArea rows={3} placeholder="Additional instructions..." />
        </Form.Item>

        <Form.Item
          name="recurrencePattern"
          label="Recurrence"
          rules={[{ required: true, message: "Please select recurrence" }]}
        >
          <Select placeholder="Select recurrence">
            <Option value="NONE">None</Option>
            <Option value="WEEKLY">Weekly</Option>
            <Option value="MONTHLY">Monthly</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Enroll
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
