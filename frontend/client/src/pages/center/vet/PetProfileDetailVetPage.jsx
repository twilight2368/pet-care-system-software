import React from "react";
import { useNavigate, useParams } from "react-router";
import PetDietDisplay from "../../../components/pets/PetDietDisplay";
import PetMedicalHistory from "../../../components/pets/PetMedicalHistory";
import EditPetModal from "../../../components/modals/EditPetModal";
import PetProfileCard from "../../../components/pets/PetProfileCard";
import EditPetPhysicInfoModal from "../../../components/center/vet/EditPetPhysicInfoModal";
import { Button } from "antd";
import { FaArrowLeft } from "react-icons/fa";

export default function PetProfileDetailVetPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 w-full ">
      <div className="mb-6">
        <div className="w-full mb-6">
          <Button
            icon={<FaArrowLeft />}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </div>
        <div className="w-full">
          <div className="flex flex-row justify-between items-center mb-3">
            <span className="text-xl logo">ℹ️ Pet information</span>
            <div className="flex justify-end items-center gap-2">
              <EditPetModal
                pet={{
                  pet_id: 1,
                  name: "Bella",
                  age: 3,
                  gender: "Female",
                  breed: "Golden Retriever",
                  color: "Golden",
                  photo_url: "",
                  weight_kg: 25.5,
                  height_cm: 55.2,
                  blood_type: "DEA1.1",
                  spayed_neutered: true,
                  microchipped: true,
                  is_alert: true,
                  health_notes:
                    "Has mild skin allergies. Regular antihistamines recommended.",
                }}
                onSave={(updatedPet) => console.log("Saved pet:", updatedPet)}
              />
              <EditPetPhysicInfoModal
                pet={{
                  pet_id: 1,
                  name: "Bella",
                  age: 3,
                  gender: "Female",
                  breed: "Golden Retriever",
                  color: "Golden",
                  photo_url: "",
                  weight_kg: 25.5,
                  height_cm: 55.2,
                  blood_type: "DEA1.1",
                  spayed_neutered: true,
                  microchipped: true,
                  is_alert: true,
                  health_notes:
                    "Has mild skin allergies. Regular antihistamines recommended.",
                }}
              />
            </div>
          </div>
          <div className=" relative w-full">
            <PetProfileCard
              pet={{
                pet_id: 1,
                name: "Bella",
                age: 3,
                gender: "Female",
                breed: "Golden Retriever",
                color: "Golden",
                photo_url: "",
                weight_kg: 25.5,
                height_cm: 55.2,
                blood_type: "DEA1.1",
                spayed_neutered: true,
                microchipped: true,
                is_alert: true,
                health_notes:
                  "Has mild skin allergies. Regular antihistamines recommended.",
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full mb-12">
        <PetDietDisplay />
      </div>
      <div className=" w-full">
        <PetMedicalHistory isVetViewing={true} />
      </div>
    </div>
  );
}
