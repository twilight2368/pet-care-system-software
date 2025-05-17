import DogImage from "../assets/mikhail-vasilyev-NodtnCsLdTE-unsplash.jpg";
import LoginCard from "../components/auth/LoginCard";
export default function LoginPage() {
  return (
    <>
      {" "}
      <div className=" min-h-screen bg-black text-white">
        <div className="w-screen h-screen flex flex-row">
          <div className="w-2/3 h-full">
            <img src={DogImage} alt="image" className="w-full h-full" />
          </div>
          <div className="w-1/3 bg-gradient-to-br from-white to-blue-50 overflow-y-clip flex justify-center items-center">
            <LoginCard />
          </div>
        </div>
      </div>
    </>
  );
}
