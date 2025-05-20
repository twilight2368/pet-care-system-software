import React from "react";
import { useState } from "react";
import { Button, Modal } from "antd";

import GroomingForm from "../forms/GroomingForm";
export default function GroomingModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Enroll service
      </Button>
      <Modal
        title="Grooming Service"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <GroomingForm />
      </Modal>
    </>
  );
}
