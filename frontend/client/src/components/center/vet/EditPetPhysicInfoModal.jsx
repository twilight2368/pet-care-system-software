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

const { Title } = Typography;

export default function EditPetPhysicInfoModal({ pet }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen && pet) {
      form.setFieldsValue({
        weight_kg: pet.weight_kg,
        height_cm: pet.height_cm,
        blood_type: pet.blood_type,
        spayed_neutered: pet.spayed_neutered,
        microchipped: pet.microchipped,
        is_alert: pet.is_alert,
        health_notes: pet.health_notes,
      });
    }
  }, [isModalOpen, pet, form]);

  const onFinish = (values) => {
    console.log("Updated pet info:", values);
    // TODO: Save/update logic here
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="blue"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Pet Health Info
      </Button>

      <Modal
        title={<span className="logo">Edit Pet Health Information</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          variant="filled"
        >
          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              label="Weight (kg)"
              name="weight_kg"
              rules={[
                { type: "number", min: 0, message: "Weight must be positive" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="Height (cm)"
              name="height_cm"
              rules={[
                { type: "number", min: 0, message: "Height must be positive" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </div>

          <Form.Item label="Blood Type" name="blood_type">
            <Input placeholder="Enter blood type" />
          </Form.Item>

          <div className="grid grid-cols-3 gap-2">
            {" "}
            <Form.Item
              label="Spayed / Neutered"
              name="spayed_neutered"
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
              name="is_alert"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item label="Health Notes" name="health_notes">
            <Input.TextArea rows={3} placeholder="Enter any health notes" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
