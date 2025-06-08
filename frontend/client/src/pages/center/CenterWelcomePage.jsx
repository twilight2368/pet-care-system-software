import React, { useState } from "react";
import "./layout.css";
import SimpleHeader from "../../components/headers/SimpleHeader";
import LoginVetCard from "../../components/auth/center/LoginVetCard";
import RegisterVetCard from "../../components/auth/center/RegisterVetCard";
import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa";

export default function CenterWelcomePage() {
  const [isRegistering, setIsRegistering] = useState(false); //* true = Register, false = Login

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="min-h-screen bg-image-page">
      <div className="w-full">
        <SimpleHeader />
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 flex flex-col gap-6 justify-center items-center">
          <div className="w-full px-6">
            <Button
              onClick={toggleMode}
              type="link"
              icon={<FaArrowRight />}
              iconPosition="end"
            >
              {isRegistering ? "Switch to Login" : "Switch to Register"}
            </Button>
          </div>
          <div className="w-full px-36 flex justify-center">
            {isRegistering ? (
              <RegisterVetCard setIsRegistering={setIsRegistering} />
            ) : (
              <LoginVetCard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
