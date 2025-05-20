import React from "react";
import { Card, Avatar, Typography, Tag, Divider } from "antd";
import { FaPaw } from "react-icons/fa";
import {
  AlertOutlined,
  HeartOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const { Title, Text } = Typography;

export default function PetProfileCard({ pet }) {
  return (
    <Card
      key={pet.pet_id}
      className="rounded-xl shadow-md bg-gradient-to-r from-indigo-100 to-purple-100"
      cover={
        pet.photo_url ? (
          <img
            alt={pet.name}
            src={pet.photo_url}
            className="h-48 object-cover w-full"
          />
        ) : (
          <div className="h-48 bg-gray-200">
            <div className="h-full flex items-center justify-center">
              <FaPaw className="text-6xl text-gray-400" />
            </div>
          </div>
        )
      }
    >
      <div className="flex flex-row items-start justify-between">
        <Title level={3} className="m-0 logo">
          {pet.name}
        </Title>
        {pet.is_alert && (
          <Tag icon={<AlertOutlined />} color="error" className=" logo">
            Health Condition Alert
          </Tag>
        )}
      </div>

      <div className="text-sm space-y-1">
        <Text>
          <strong>Breed:</strong> {pet.breed || "N/A"}
        </Text>
        <br />
        <Text>
          <strong>Color:</strong> {pet.color || "N/A"}
        </Text>
        <br />
        <Text>
          <strong>Gender:</strong> {pet.gender || "N/A"}
        </Text>
        <br />
        <Text>
          <strong>Age:</strong> {pet.age != null ? `${pet.age} years` : "N/A"}
        </Text>
      </div>

      <Divider className="my-3" />

      <div className="text-sm p-3 bg-white/70 rounded-sm shadow-inner space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Text>
            <strong>Weight:</strong>{" "}
            {pet.weight_kg ? `${pet.weight_kg} kg` : "N/A"}
          </Text>
          <Text>
            <strong>Height:</strong>{" "}
            {pet.height_cm ? `${pet.height_cm} cm` : "N/A"}
          </Text>
          <Text>
            <strong>Blood Type:</strong>{" "}
            {pet.blood_type || (
              <span className="text-gray-400 italic">Unknown</span>
            )}
          </Text>
          <Text>
            <strong>Spayed/Neutered:</strong>{" "}
            <Tag color={pet.spayed_neutered ? "green" : "default"}>
              {pet.spayed_neutered ? "Yes" : "No"}
            </Tag>
          </Text>
          <Text>
            <strong>Microchipped:</strong>{" "}
            <Tag color={pet.microchipped ? "blue" : "default"}>
              {pet.microchipped ? "Yes" : "No"}
            </Tag>
          </Text>
        </div>
        {pet.health_notes && (
          <div>
            <Text className="block">
              <strong>Health Notes:</strong>
            </Text>
            <Text type="secondary" className="italic">
              {pet.health_notes}
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
}
