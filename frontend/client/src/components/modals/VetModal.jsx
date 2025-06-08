import React, { useState } from "react";
import { Button, Modal } from "antd";
import VetForm from "../forms/VetForm";

export default function VetModal({
  isVetMaking = false,
  pet = null,
  enroll_for,
}) {
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
      <Button variant="outlined" color="default" onClick={showModal}>
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
          <VetForm
            isVetMaking={isVetMaking}
            pet={pet}
            enroll_for={enroll_for}
          />
        </div>
      </Modal>
    </>
  );
}
