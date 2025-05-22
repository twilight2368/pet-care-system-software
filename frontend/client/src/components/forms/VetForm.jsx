import React from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const { Option } = Select;

export default function VetForm() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Vaccination Appointment Data:", values);
    toast.success("Vaccination appointment scheduled!");
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          appointment_type: "Vaccination",
          status: "Pending",
        }}
      >
        <Form.Item
          name="pet_id"
          label="Pet"
          rules={[{ required: true, message: "Please select a pet" }]}
        >
          <Select placeholder="Select pet">
            <Option value={1}>Bella</Option>
            <Option value={2}>Rocky</Option>
            {/* Replace with dynamic pet options */}
          </Select>
        </Form.Item>

        <Form.Item
          name="appointment_date"
          label="Date & Time"
          rules={[
            { required: true, message: "Please choose appointment time" },
          ]}
        >
          <DatePicker
            showTime={{
              format: "HH:mm",
              defaultValue: dayjs("00:00", "HH:mm"),
              showSecond: false,
              hourStep: 1,
              minuteStep: 5,
              hideDisabledOptions: true, // This hides disabled options
              disabledHours: () => [
                ...Array(6).keys(), // Disable 0-6
                ...Array.from({ length: 6 }, (_, i) => i + 18), // Disable 18-23
              ],
            }}
            className="w-full"
          />
        </Form.Item>

        <Form.Item name="notes" label="Notes (optional)">
          <Input.TextArea rows={3} placeholder="Add any extra information" />
        </Form.Item>

        {/* Hidden fields */}
        <Form.Item name="appointment_type" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="status" hidden>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit Appointment
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
