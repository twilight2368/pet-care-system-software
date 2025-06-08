import React from "react";
import { Card, Avatar, Typography, Carousel, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaPaw } from "react-icons/fa";
const { Title, Text } = Typography;
import PlaceholderImage from "../../assets/cute-dog-with-sunglasses-posing-portrait-generative-ai.jpg";
export default function RenderPetCard({ pet }) {
  return (
    <div className="w-full h-full">
      <Card
        key={pet.pet_id}
        variant="borderless"
        className="h-full w-full"
        title={
          <div className="flex items-center gap-3">
            <Avatar src={PlaceholderImage} />
            <span>{pet.name}</span>
          </div>
        }
      >
        <Text>
          <strong>Breed:</strong> {pet.breed}
        </Text>
        <br />
        <Text>
          <strong>Color:</strong> {pet.color}
        </Text>
        <br />
        <Text>
          <strong>Gender:</strong> {pet.gender}
        </Text>
        <br />
        <Text>
          <strong>Age:</strong> {pet.age} years
        </Text>
      </Card>
    </div>
  );
}
