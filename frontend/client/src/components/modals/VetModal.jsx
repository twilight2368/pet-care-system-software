import React, { useState } from "react";
import { Button, Modal } from "antd";
import VetForm from "../forms/VetForm";

export default function VetModal() {
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
        Make a new appointment
      </Button>
      <Modal
        title="Veterinary service"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <VetForm />
        </div>
      </Modal>
    </>
  );
}
