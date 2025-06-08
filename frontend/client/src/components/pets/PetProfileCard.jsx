import React from "react";
import {
  Card,
  Avatar,
  Image,
  Typography,
  Tag,
  Divider,
  Alert,
  Descriptions,
} from "antd";
import { EyeOutlined, CameraOutlined } from "@ant-design/icons";
import { AlertOutlined } from "@ant-design/icons";
import PlaceholderImage from "../../assets/cute-dog-with-sunglasses-posing-portrait-generative-ai.jpg";

const { Title, Text } = Typography;

export default function PetProfileCard({ pet }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6 p-6">
        <div className="flex flex-col justify-center text-gray-800">
          {/* Pet Name */}
          <div className="mb-6">
            <Title
              level={3}
              className="m-0 logo flex items-center gap-2 text-blue-700"
            >
              🐾 {pet.name}
            </Title>
          </div>

          {/* Pet Details */}
          <Descriptions size="middle" column={1} bordered>
            <Descriptions.Item label="🐕 Breed">
              {pet.breed || (
                <Text type="secondary" italic>
                  Not specified
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="🎨 Color">
              {pet.color || (
                <Text type="secondary" italic>
                  Not specified
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="⚧ Gender">
              {pet.gender || (
                <Text type="secondary" italic>
                  Not specified
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="🎂 Age">
              {pet.age != null ? (
                <span>
                  {pet.age} {pet.age === 1 ? "year" : "years"} old
                </span>
              ) : (
                <Text type="secondary" italic>
                  Not specified
                </Text>
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div className="flex justify-center items-center">
          <Image
            src={pet?.photo_url || PlaceholderImage}
            alt={`Photo of ${pet.name}`}
            fallback={PlaceholderImage}
            style={{
              height: "250px",
              width: "auto",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      <Divider className="my-3 logo text-sm">Pet health information</Divider>

      <div className="text-sm p-4 mb-3 space-y-3">
        <div>
          {pet.is_alert && (
            <Alert
              message="Health Condition Alert"
              type="error"
              icon={<AlertOutlined />}
              showIcon
              className="mb-3 logo"
            />
          )}
        </div>
        <div className="mt-6">
          <Descriptions size="small" column={1} bordered>
            <Descriptions.Item label={<span>⚖️ Weight</span>} span={1}>
              {pet.weight_kg ? (
                `${pet.weight_kg} kg`
              ) : (
                <Text type="secondary" italic>
                  Not recorded
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label={<span>📏 Height</span>} span={1}>
              {pet.height_cm ? (
                `${pet.height_cm} cm`
              ) : (
                <Text type="secondary" italic>
                  Not recorded
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label={<span>🩸 Blood Type</span>} span={1}>
              {pet.blood_type || (
                <Text type="secondary" italic>
                  Unknown
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label={<span>✂️ Spayed/Neutered</span>} span={1}>
              <Tag color={pet.spayed_neutered ? "green" : "default"}>
                {pet.spayed_neutered ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label={<span>🔗 Microchipped</span>} span={1}>
              <Tag color={pet.microchipped ? "blue" : "default"}>
                {pet.microchipped ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>

            {pet.health_notes && (
              <Descriptions.Item label={<span>📋 Health Notes</span>} span={1}>
                <Text type="secondary" className="italic">
                  {pet.health_notes}
                </Text>
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      </div>
    </div>
  );
}
