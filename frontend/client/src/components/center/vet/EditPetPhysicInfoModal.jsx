import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Typography,
  Form,
  Input,
  InputNumber,
  Switch,
} from "antd";
import { updatePetById } from "../../../apis/api";
import { toast } from "react-toastify";

const { Title } = Typography;

export default function EditPetPhysicInfoModal({ pet }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen && pet) {
      form.setFieldsValue({
        weightKg: pet.weightKg,
        heightCm: pet.heightCm,
        bloodType: pet.bloodType,
        spayedNeutered: pet.spayedNeutered,
        microchipped: pet.microchipped,
        isAlert: pet.isAlert,
        healthNotes: pet.healthNotes,
      });
    }
  }, [isModalOpen, pet, form]);

  const onFinish = (values) => {
    const updatedPet = {
      ...pet,
      ...values,
    };

    console.log("Updated pet info:", updatedPet);
    updatePetById(pet.petId, updatedPet)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        toast.success("Updated physic information successful");
      })
      .catch(() => {
        toast.error("Updated physic information successful");
      });
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Edit Pet Health Info</Button>

      <Modal
        title={<span className="logo">Edit Pet Health Information</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Save"
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              label="Weight (kg)"
              name="weightKg"
              rules={[
                { type: "number", min: 0, message: "Weight must be positive" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="Height (cm)"
              name="heightCm"
              rules={[
                { type: "number", min: 0, message: "Height must be positive" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </div>

          <Form.Item label="Blood Type" name="bloodType">
            <Input placeholder="Enter blood type" />
          </Form.Item>

          <div className="grid grid-cols-3 gap-2">
            <Form.Item
              label="Spayed / Neutered"
              name="spayedNeutered"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Microchipped"
              name="microchipped"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Health Condition Alert"
              name="isAlert"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item label="Health Notes" name="healthNotes">
            <Input.TextArea rows={3} placeholder="Enter any health notes" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
