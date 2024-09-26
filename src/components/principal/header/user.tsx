"use client";
import ModalAuth from "@/components/auth";
import UserLogo from "@/components/icons/logo-user";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import UserIconLogin from "@/components/icons/user-sign-in";
import Logout from "@/components/icons/logout";
import { useRouter } from "next/navigation";

const User: React.FC = () => {
  const { data: session } = useSession(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const route =useRouter()

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSignOut = () => {
    signOut(); 
    route.push("/")
  };

  return (
    <div className="mt-[13.5px] items-center justify-center flex">
      {session ? (
        <>
          <UserIconLogin className="w-[32px] h-[32px]" />
          <button onClick={handleSignOut} className="p-2 rounded-lg">
            <Logout className="w-6 h-8"/>
          </button>
        </>
      ) : (
        <>
          <button onClick={handleOpenModal} className="flex items-center p-2 rounded-lg">
            <UserLogo className="w-[32px] h-[32px]" />
            <h2 className="w-full h-full">Login</h2>
          </button>
          {isModalOpen && (
            <ModalAuth onClose={handleCloseModal} />
          )}
        </>
      )}
    </div>
  );
};

export default User;
