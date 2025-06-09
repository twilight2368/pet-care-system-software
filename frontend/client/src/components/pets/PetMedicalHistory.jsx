import React, { useEffect, useState } from "react";
import { Timeline, Card, Typography, Spin, Empty } from "antd";
import MedicalRecordModal from "../center/vet/MedicalRecordModal";
import { getMedicalRecordByPetId } from "../../apis/api";
import { toast } from "react-toastify";

const { Text, Paragraph } = Typography;

export default function PetMedicalHistoryTimeline({
  petId,
  pet,
  isVetViewing = false,
}) {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    getMedicalRecordByPetId(petId)
      .then((res) => {
        setMedicalRecords(res.data);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
      })
      .catch(() => {
        toast.error("Fail to fetch medical records");
      });
  }, [petId]);

  if (!petId) {
    return (
      <div className="w-full flex justify-center">
        <Spin tip="Loading" size="large" />
      </div>
    );
  }

  return (
    <Card
      title={
        isVetViewing ? (
          <>
            <div className="flex flex-row justify-between items-center">
              <div>🩺 Medical History</div>
              <MedicalRecordModal pet={pet} />
            </div>
          </>
        ) : (
          <>🩺 Medical History</>
        )
      }
      className="mb-6"
    >
      {medicalRecords?.length ? (
        <>
          <Timeline className="my-6">
            {medicalRecords.map((record, index) => (
              <Timeline.Item key={index}>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-semibold text-blue-600">
                    {record.visitDate}
                  </span>
                </p>
                <p className="mb-1">
                  <span className="font-medium text-gray-700">Diagnosis:</span>{" "}
                  {record.diagnosis || "N/A"}
                </p>
                <p className="mb-1">
                  <span className="font-medium text-gray-700">
                    Prescription:
                  </span>{" "}
                  {record.prescription || "N/A"}
                </p>
                <p className="mb-1">
                  <span className="font-medium text-gray-700">
                    Vaccination:
                  </span>{" "}
                  {record.vaccinationDetails || "N/A"}
                </p>
                <p className="mb-1">
                  <span className="font-medium text-gray-700">Allergies:</span>{" "}
                  {record.allergies || "N/A"}
                </p>
                <p className="mb-1">
                  <span className="font-medium text-gray-700">
                    Chronic Diseases:
                  </span>{" "}
                  {record.chronicDiseases || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Vet:</span>{" "}
                  {record.veterinarian?.fullName || "N/A"}
                </p>
              </Timeline.Item>
            ))}
          </Timeline>
        </>
      ) : (
        <>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </>
      )}
    </Card>
  );
}
