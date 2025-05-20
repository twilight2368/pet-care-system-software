import React from "react";
import { Timeline, Card, Typography } from "antd";

const { Text, Paragraph } = Typography;

export default function PetMedicalHistoryTimeline({ petId }) {
  // Sample mock data (replace with real data from backend)
  const medicalRecords = [
    {
      pet_id: petId,
      veterinarian_id: 101,
      visit_date: "2024-04-12",
      diagnosis: "Skin infection",
      prescription: "Antibiotic cream, oral meds",
      vaccination_details: "Rabies (2024-03-01)",
      allergies: "None",
      chronic_diseases: "None",
    },
    {
      pet_id: petId,
      veterinarian_id: 102,
      visit_date: "2023-11-28",
      diagnosis: "General check-up",
      prescription: "Vitamin supplements",
      vaccination_details: "DHPPL booster",
      allergies: "Pollen",
      chronic_diseases: "Arthritis",
    },
  ];

  return (
    <Card title="🩺 Medical History" className="mb-6">
      <Timeline className="my-6">
        {medicalRecords.map((record, index) => (
          <Timeline.Item key={index}>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-semibold text-blue-600">
                {record.visit_date}
              </span>
            </p>
            <p className="mb-1">
              <span className="font-medium text-gray-700">Diagnosis:</span>{" "}
              {record.diagnosis || "N/A"}
            </p>
            <p className="mb-1">
              <span className="font-medium text-gray-700">Prescription:</span>{" "}
              {record.prescription || "N/A"}
            </p>
            <p className="mb-1">
              <span className="font-medium text-gray-700">Vaccination:</span>{" "}
              {record.vaccination_details || "N/A"}
            </p>
            <p className="mb-1">
              <span className="font-medium text-gray-700">Allergies:</span>{" "}
              {record.allergies || "N/A"}
            </p>
            <p className="mb-1">
              <span className="font-medium text-gray-700">
                Chronic Diseases:
              </span>{" "}
              {record.chronic_diseases || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Vet ID:</span>{" "}
              {record.veterinarian_id}
            </p>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
}
