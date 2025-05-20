import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa";

const { RangePicker } = DatePicker;

export default function DietPetFormModal({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const [start, end] = values.date_range || [];
    const formatted = {
      pet_id: values.pet_id,
      diet_details: values.diet_details,
      start_date: start ? start.format("YYYY-MM-DD") : null,
      end_date: end ? end.format("YYYY-MM-DD") : null,
    };
    onSubmit?.(formatted);
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)} icon={<FaPlus />}>
        Assign new diet
      </Button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Assign Diet Plan"
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="date_range"
            label="Diet Duration"
            rules={[{ required: true, message: "Please select date range" }]}
          >
            <RangePicker picker="week" className="w-full" />
          </Form.Item>
          <Form.Item
            name="diet_details"
            label="Diet Details"
            rules={[{ required: true, message: "Please enter diet details" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="e.g. chicken, dry food, vitamins..."
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
