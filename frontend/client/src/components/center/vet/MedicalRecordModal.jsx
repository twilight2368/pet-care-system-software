import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { createMedicalRecord } from "../../../apis/api";

const { TextArea } = Input;

export default function MedicalRecordModal({ pet }) {
  const [isOpen, setIsOpen] = useState(false);
  const [petInfo] = useState(pet);
  const [form] = Form.useForm();
  const vet_user = useSelector((state) => state.user.user_info);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (values) => {
    const payload = {
      visitDate: values.visitDate.format("YYYY-MM-DD"),
      diagnosis: values.diagnosis || "",
      prescription: values.prescription || "",
      vaccinationDetails: values.vaccinationDetails || "",
      allergies: values.allergies || "",
      chronicDiseases: values.chronicDiseases || "",
      pet: petInfo,
      veterinarian: vet_user,
    };

    createMedicalRecord(payload)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        toast.success("Medical record saved!");
        form.resetFields();
        closeModal();
      })
      .catch(() => {
        toast.error("Failed to make medical record");
      });
  };

  return (
    <>
      <Button onClick={openModal} icon={<FaPlus />}>
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
            visitDate: dayjs(),
          }}
        >
          <Form.Item
            name="visitDate"
            label="📅 Visit Date"
            rules={[
              { required: true, message: "Please select the visit date" },
            ]}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item name="diagnosis" label="🩺 Diagnosis">
            <TextArea rows={2} placeholder="Enter diagnosis details" />
          </Form.Item>

          <Form.Item name="prescription" label="💊 Prescription">
            <TextArea rows={2} placeholder="Enter prescribed medication" />
          </Form.Item>

          <Form.Item name="vaccinationDetails" label="🧪 Vaccination Details">
            <TextArea rows={2} placeholder="Enter vaccination info" />
          </Form.Item>

          <Form.Item name="allergies" label="🌿 Allergies">
            <TextArea rows={2} placeholder="Enter known allergies" />
          </Form.Item>

          <Form.Item name="chronicDiseases" label="🧬 Chronic Diseases">
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
