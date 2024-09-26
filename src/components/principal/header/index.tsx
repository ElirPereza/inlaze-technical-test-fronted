import React from "react";
import Logo from "./logo";
import Navi from "./navi";
import User from "./user";

const Header:React.FC = () => {
  return (
    <div className="flex w-auto h-[69px] bg-black justify-between mx-[100px] ">
        <div className="flex">
          {/* LOGO */}
          <Logo />
          {/* NAVEGACION */}
          <Navi />
        </div>
        {/* USER */}
        <User />
      </div>
  );
};

export default Header;
