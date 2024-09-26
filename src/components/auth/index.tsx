import React, { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import Back from "../icons/back";

const ModalAuth: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn((prev) => !prev); 
  };
 
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 ">
      <div className="relative flex items-center md:left-[-380px] md:top-[120px] justify-between top-32 rounded-lg p-6 w-full max-w-md z-50">
        <button
          onClick={onClose}
          className=" md:absolute text-white left-4 top-4 hover:text-gray-800"
        >
         <Back/>
        </button>
        <button
          onClick={handleToggle}
          className="md:absolute top-4 right-4 text-[#F0B90B] border border-[#F0B90B] rounded-lg py-2 px-4 hover:bg-[#F0B90B] hover:text-white transition"
        >
          {isSignIn ? "Switch to Sign Up" : "Switch to Sign In"}
        </button>
      </div>
      <div className="mt-8">{isSignIn 
      ? <SignIn /> 
      : <SignUp />}</div>
    </div>
  );
};

export default ModalAuth;
