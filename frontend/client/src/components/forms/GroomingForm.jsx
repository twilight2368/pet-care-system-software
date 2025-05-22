import React from "react";
import { Form, Input, DatePicker, Button, Switch, Select } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function GroomingForm() {
  const [form] = Form.useForm();

  const pets = [
    { id: 1, name: "Fluffy" },
    { id: 2, name: "Bella" },
    { id: 3, name: "Max" },
  ];

  const handleFinish = async (values) => {
    const payload = {
      pet_id: values.pet_id,
      owner_id: values.owner_id,
      staff_id: values.staff_id,
      service_date: values.service_date.format("YYYY-MM-DD HH:mm:ss"),
      service_type: "BathAndTrim",
      is_recurring: values.is_recurring,
      recurs_until: values.recurs_until
        ? values.recurs_until.format("YYYY-MM-DD")
        : null,
      notes: values.notes || "",
      status: "Pending",
    };

    // Replace this with your actual API call
    console.log("Submitting grooming service:", payload);

    toast.success("Bath & Trim service enrolled successfully!");
    form.resetFields();
  };

  return (
    <div className="w-full mx-auto  bg-white">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ is_recurring: false }}
      >
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
          name="service_date"
          label="Service Date & Time"
          rules={[{ required: true, message: "Please pick a date and time" }]}
        >
          <DatePicker
            needConfirm
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
            format="YYYY-MM-DD HH:mm"
            className="w-full"
          />
        </Form.Item>

        <Form.Item name="notes" label="Notes (Optional)">
          <Input.TextArea rows={3} placeholder="Additional instructions..." />
        </Form.Item>

        <Form.Item
          name="recurrence_pattern"
          label="Recurrence"
          rules={[{ required: true, message: "Please select recurrence" }]}
        >
          <Select defaultValue={"None"} placeholder="Select recurrence">
            <Option value="None">None</Option>
            <Option value="Weekly">Weekly</Option>
            <Option value="Monthly">Monthly</Option>
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
