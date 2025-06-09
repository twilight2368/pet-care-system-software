import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PetDietDisplay from "../../../components/pets/PetDietDisplay";
import PetMedicalHistory from "../../../components/pets/PetMedicalHistory";
import EditPetModal from "../../../components/modals/EditPetModal";
import PetProfileCard from "../../../components/pets/PetProfileCard";
import EditPetPhysicInfoModal from "../../../components/center/vet/EditPetPhysicInfoModal";
import { Button, Skeleton } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { getPetById } from "../../../apis/api";
import { toast } from "react-toastify";

export default function PetProfileDetailVetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    getPetById(id)
      .then((res) => {
        setPet(res.data);
      })
      .catch(() => {
        toast.error("Oop!!");
      });
  }, [id]);

  if (!pet) {
    return <Skeleton />;
  }

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
                pet={pet}
                onSave={(updatedPet) => console.log("Saved pet:", updatedPet)}
              />
              <EditPetPhysicInfoModal pet={pet} />
            </div>
          </div>
          <div className=" relative w-full">
            <PetProfileCard pet={pet} />
          </div>
        </div>
      </div>
      <div className="w-full mb-12">
        <PetDietDisplay pet={pet} petId={pet.petId} />
      </div>
      <div className=" w-full">
        <PetMedicalHistory pet={pet} petId={pet.petId} isVetViewing={true} />
      </div>
    </div>
  );
}
