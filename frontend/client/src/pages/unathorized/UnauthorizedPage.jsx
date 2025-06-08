import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { RiArrowGoBackLine } from "react-icons/ri";
import "./unauthpage.css";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center bg-image-unauth px-60">
      <h1 className="text-4xl font-semibold logo text-blue-600 mb-4">
        Page Unauthorized
      </h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for is not available for now.
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

export default UnauthorizedPage;
