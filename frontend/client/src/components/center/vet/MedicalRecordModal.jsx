import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker, Select } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa";

const { TextArea } = Input;
const { Option } = Select;

export default function MedicalRecordModal({
  petOptions = [],
  vetOptions = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (values) => {
    console.log("Medical Record Submitted:", values);
    toast.success("Medical record saved!");
    form.resetFields();
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal} icon={<FaPlus />}>
        {" "}
        Add Medical Record
      </Button>

      <Modal
        open={isOpen}
        title="📋 Medical Record"
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            visit_date: dayjs(), // Default to today
          }}
        >
          <Form.Item
            name="visit_date"
            label="📅 Visit Date"
            rules={[
              { required: true, message: "Please select the visit date" },
            ]}
          >
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
              value={form.getFieldValue("visit_date")}
              defaultValue={dayjs()}
              onChange={(date) => form.setFieldsValue({ visit_date: date })}
            />
          </Form.Item>

          <Form.Item name="diagnosis" label="🩺 Diagnosis">
            <TextArea rows={2} placeholder="Enter diagnosis details" />
          </Form.Item>

          <Form.Item name="prescription" label="💊 Prescription">
            <TextArea rows={2} placeholder="Enter prescribed medication" />
          </Form.Item>

          <Form.Item name="vaccination_details" label="🧪 Vaccination Details">
            <TextArea rows={2} placeholder="Enter vaccination info" />
          </Form.Item>

          <Form.Item name="allergies" label="🌿 Allergies">
            <TextArea rows={2} placeholder="Enter known allergies" />
          </Form.Item>

          <Form.Item name="chronic_diseases" label="🧬 Chronic Diseases">
            <TextArea rows={2} placeholder="Enter chronic conditions" />
          </Form.Item>

          <Form.Item className="pt-2">
            <Button type="primary" htmlType="submit" className="w-full">
              💾 Save Record
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
