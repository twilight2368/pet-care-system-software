import React from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

// Enum options
const appointmentTypes = [
  "Checkup",
  "Vaccination",
  "Testing",
  "Reexam",
  "Other",
];
const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "CheckedIn",
  "CheckedOut",
  "Cancelled",
];

export default function VetForm({ isVetMaking = false, pet_id = null }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Vaccination Appointment Data:", values);
    toast.success("Vaccination appointment scheduled!");
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        appointment_type: "Vaccination",
        status: "Pending",
      }}
    >
      {/* Pet Selector */}
      {!pet_id && (
        <Form.Item
          name="pet_id"
          label="Select Pet"
          rules={[{ required: true, message: "Please select a pet" }]}
        >
          <Select placeholder="Choose a pet">
            <Option value={1}>Bella</Option>
            <Option value={2}>Rocky</Option>
            {/* Replace with dynamic pet list */}
          </Select>
        </Form.Item>
      )}

      {/* Appointment Type (visible to vet) */}
      {isVetMaking && (
        <Form.Item
          name="appointment_type"
          label="Appointment Type"
          rules={[
            { required: true, message: "Please select appointment type" },
          ]}
        >
          <Select placeholder="Choose type">
            {appointmentTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {/* Appointment Date */}
      <Form.Item
        name="appointment_date"
        label="Date & Time"
        rules={[{ required: true, message: "Please choose a date and time" }]}
      >
        <DatePicker
          showTime={{
            format: "HH:mm",
            defaultValue: dayjs("09:00", "HH:mm"),
            hideDisabledOptions: true,
            disabledHours: () => [...Array(7).keys(), 18, 19, 20, 21, 22, 23],
            minuteStep: 5,
          }}
          format="YYYY-MM-DD HH:mm"
          className="w-full"
        />
      </Form.Item>

      {/* Internal Notes */}
      <Form.Item name="notes" label="Notes (optional)">
        <TextArea rows={3} placeholder="Include any additional info..." />
      </Form.Item>

      {/* Appointment Status (visible to vet) */}
      {isVetMaking && (
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select status">
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Submit Appointment
        </Button>
      </Form.Item>
    </Form>
  );
}
