import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import { FaPlus } from "react-icons/fa";
import { makeDietPlan } from "../../apis/api";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;

export default function DietPetFormModal({ pet }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const [start, end] = values.date_range || [];
    const formatted = {
      pet: pet,
      dietDetails: values.diet_details,
      startDate: start ? start.format("YYYY-MM-DD") : null,
      endDate: end ? end.format("YYYY-MM-DD") : null,
    };
    makeDietPlan(formatted)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        form.resetFields();
        toast.success("Added diet plan");
      })
      .catch(() => {
        toast.error("Something went wrong!!!");
      });
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
