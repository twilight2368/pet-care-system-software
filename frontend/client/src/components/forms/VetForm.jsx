import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { createAppointment, getPetByUser } from "../../apis/api";
import { useSelector } from "react-redux";

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

export default function VetForm({
  isVetMaking = false,
  pet = null,
  enroll_for,
}) {
  const [pets, setPets] = useState([]);
  const [form] = Form.useForm();
  const user_id = useSelector((state) => state.user.user_id);
  const user = useSelector((state) => state.user.user_info);

  useEffect(() => {
    if (!isVetMaking) {
      getPetByUser(user_id)
        .then((res) => {
          setPets(res.data);
        })
        .catch(() => {
          toast.error("Failed to fetch pets data");
        });
    }
  }, []);

  const handleSubmit = (values) => {
    let selectedPet = null;

    if (!pet) {
      selectedPet = pets.find((pet) => pet.petId === values.pet);
    }

    const petObj = pet || selectedPet;

    const payload = {
      ...values,
      pet: petObj,
      owner: petObj.owner,
      veterinarian: isVetMaking ? user : null,
      appointmentType: enroll_for || values?.appointmentType,
      appointmentDate: values.appointmentDate.toISOString(),
    };

    console.log("Final Appointment Payload:", payload);
    createAppointment(payload)
      .then((res) => {
        console.log("====================================");
        console.log("Appointment made:", res.data);
        console.log("====================================");
        toast.success("Vaccination appointment scheduled!");
        form.resetFields();
      })
      .catch(() => {
        toast.error("Failed to make appointment");
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        appointmentType: "Vaccination",
        status: "Pending",
      }}
    >
      {/* Pet Selector */}
      {!pet && (
        <Form.Item
          name="pet"
          label="Select Pet"
          rules={[{ required: true, message: "Please select a pet" }]}
        >
          <Select placeholder="Choose a pet">
            {pets.map((p) => (
              <Option key={p.petId} value={p.petId}>
                {p.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {/* Appointment Type */}
      {isVetMaking && (
        <Form.Item
          name="appointmentType"
          label="Appointment Type"
          rules={[
            { required: true, message: "Please select appointment type" },
          ]}
        >
          <Select placeholder="Choose type">
            {appointmentTypes.map((type) => (
              <Option key={type.toUpperCase()} value={type.toUpperCase()}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {/* Date */}
      <Form.Item
        name="appointmentDate"
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

      {/* Notes from Client */}
      <Form.Item name="notesFromClient" label="Notes (optional)">
        <TextArea rows={3} placeholder="Include any additional info..." />
      </Form.Item>

      {/* Vet Notes */}
      {isVetMaking && (
        <Form.Item name="notes" label="Internal Notes (optional)">
          <TextArea rows={3} placeholder="Vet notes..." />
        </Form.Item>
      )}

      {/* Status */}
      {isVetMaking && (
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select status">
            {statusOptions.map((status) => (
              <Option key={status.toUpperCase()} value={status.toUpperCase()}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Submit Appointment
        </Button>
      </Form.Item>
    </Form>
  );
}
