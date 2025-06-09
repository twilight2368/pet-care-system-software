import React from "react";
import { Card, Typography } from "antd";
import { Link } from "react-router";
import PlaceholderImage_1 from "../../assets/cute-dog-with-sunglasses-posing-portrait-generative-ai.jpg";
import PlaceholderImage_2 from "../../assets/adorable-looking-kitten-with-sunglasses.jpg";
const { Title, Text } = Typography;

export default function RenderPetCardWithCover({ pet }) {
  return (
    <Link to={`${pet.petId}`}>
      <Card
        key={pet.petId}
        className="rounded-xl shadow-md bg-gradient-to-r from-indigo-100 to-purple-100 hover:shadow-lg transition-shadow duration-300"
        cover={
          <img
            alt={pet.name}
            src={pet.petId % 2 ? PlaceholderImage_1 : PlaceholderImage_2}
            className="h-48 object-cover w-full rounded-t-xl"
          />
        }
      >
        <Title level={4} className="mb-1">
          {pet.name}
        </Title>
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
    </Link>
  );
}
