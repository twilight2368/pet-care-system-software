import React from "react";
import { useParams } from "react-router";
import { Anchor, Button, Col, Row } from "antd";
import "../layout.css";
import PetDietDisplay from "../../components/pets/PetDietDisplay";
import PetMedicalHistory from "../../components/pets/PetMedicalHistory";
import EditPetModal from "../../components/modals/EditPetModal";
import PetProfileCard from "../../components/pets/PetProfileCard";
const { Link } = Anchor;

export default function OnePetDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-6 w-full outlet-layout overflow-y-auto m-0">
      <div className="min-h-96 mb-16 flex flex-row gap-12 justify-start items-start">
        <div className="w-5/12">
          <div className="flex flex-row justify-between items-center mb-3">
            <span className="text-xl logo">ℹ️ Pet information</span>
            <EditPetModal
              pet={{
                pet_id: 1,
                name: "Bella",
                age: 3,
                gender: "Female",
                breed: "Golden Retriever",
                color: "Golden",
                photo_url: "",
              }}
              onSave={(updatedPet) => console.log("Saved pet:", updatedPet)}
            />
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
        <div className="w-7/12">
          <PetDietDisplay />
        </div>
      </div>
      <div className=" w-full">
        <PetMedicalHistory />
      </div>
    </div>
  );
}
