import React from "react";
import { Image, Typography, Tag, Divider, Alert, Descriptions } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import PlaceholderImage_1 from "../../assets/cute-dog-with-sunglasses-posing-portrait-generative-ai.jpg";
import PlaceholderImage_2 from "../../assets/adorable-looking-kitten-with-sunglasses.jpg";

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
              🐾 {pet?.name}
            </Title>
          </div>

          {/* Pet Details */}
          <Descriptions size="middle" column={1} bordered>
            <Descriptions.Item label="🐕 Breed">
              {pet?.breed || (
                <Text type="secondary" italic>
                  Not specified
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="🎨 Color">
              {pet?.color || (
                <Text type="secondary" italic>
                  Not specified
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="⚧ Gender">
              {pet?.gender || (
                <Text type="secondary" italic>
                  Not specified
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="🎂 Age">
              {pet?.age != null ? (
                <span>
                  {pet?.age} {pet?.age === 1 ? "year" : "years"} old
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
            src={pet?.petId % 2 ? PlaceholderImage_1 : PlaceholderImage_2}
            alt={`Photo of ${pet?.name}`}
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
          {pet?.isAlert && (
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
            <Descriptions.Item label="⚖️ Weight" span={1}>
              {pet?.weightKg ? (
                `${pet?.weightKg} kg`
              ) : (
                <Text type="secondary" italic>
                  Not recorded
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="📏 Height" span={1}>
              {pet?.heightCm ? (
                `${pet?.heightCm} cm`
              ) : (
                <Text type="secondary" italic>
                  Not recorded
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="🩸 Blood Type" span={1}>
              {pet?.bloodType || (
                <Text type="secondary" italic>
                  Unknown
                </Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="✂️ Spayed/Neutered" span={1}>
              <Tag color={pet?.spayedNeutered ? "green" : "default"}>
                {pet?.spayedNeutered ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="🔗 Microchipped" span={1}>
              <Tag color={pet?.microchipped ? "blue" : "default"}>
                {pet?.microchipped ? "Yes" : "No"}
              </Tag>
            </Descriptions.Item>

            {pet?.healthNotes && (
              <Descriptions.Item label="📋 Health Notes" span={1}>
                <Text type="secondary" className="italic">
                  {pet?.healthNotes}
                </Text>
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      </div>
    </div>
  );
}
