import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Skeleton } from "antd";
import "../layout.css";
import PetDietDisplay from "../../components/pets/PetDietDisplay";
import PetMedicalHistory from "../../components/pets/PetMedicalHistory";
import EditPetModal from "../../components/modals/EditPetModal";
import PetProfileCard from "../../components/pets/PetProfileCard";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../../components/footers/Footer";
import { getPetById } from "../../apis/api";
import { toast } from "react-toastify";

export default function OnePetDetailPage() {
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

  return (
    <>
      {pet ? (
        <>
          <div className="p-6 w-full outlet-layout overflow-y-auto m-0">
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
                    <EditPetModal pet={pet} />
                  </div>
                </div>
                <div className=" relative w-full">
                  <PetProfileCard pet={pet} />
                </div>
              </div>
            </div>
            <div className="w-full mb-12">
              <PetDietDisplay petId={pet.petId} pet={pet} />
            </div>
            <div className=" w-full mb-12">
              <PetMedicalHistory petId={pet.petId} />
            </div>
            <div className="w-full pb-12">
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <>
          <Skeleton />
        </>
      )}
    </>
  );
}
