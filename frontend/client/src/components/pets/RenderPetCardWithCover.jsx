import React from "react";
import { Card, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router";

const { Title, Text } = Typography;
export default function RenderPetCardWithCover({ pet }) {
  return (
    <>
      <Link to="pet-details">
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
                  <FaPaw className=" text-6xl" />
                </div>
              </div>
            )
          }
        >
          <Title level={4}>{pet.name}</Title>
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
    </>
  );
}
