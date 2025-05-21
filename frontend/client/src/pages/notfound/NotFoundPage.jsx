import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { RiArrowGoBackLine } from "react-icons/ri";
import "./notfound.css";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center bg-image-notfound px-60">
      <h1 className="text-6xl font-bold logo text-blue-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold logo text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Button
        type="primary"
        size="large"
        className="rounded-md logo w-fit"
        icon={<RiArrowGoBackLine />}
        iconPosition="start"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
