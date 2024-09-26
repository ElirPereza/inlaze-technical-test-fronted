import Rectangle1 from "@/components/icons/rectangle1";
import Rectangle2 from "@/components/icons/rectangle2";
import React from "react";

const Logo:React.FC = () => {
  return (
    <div className="mt-[13.5px] mr-[100px] ">
      <h2 className=" text-white text-[25px] font-bold leading-[28px] tracking-[0.15em] text-left uppercase">
        quickbet
      </h2>
      <div className="flex items-center justify-center gap-2">
        <Rectangle1 className="w-[35px] h-[4px]" />
        <h2
          className=" left-[24px] top-[28px] 
        font-montserrat font-bold text-[12px] leading-[13px] 
        flex items-center text-center tracking-[0.15em] 
        uppercase text-[#F0B90B]"
        >
          movies
        </h2>
        <Rectangle2 className="w-[35px] h-[4px]" />
      </div>
    </div>
  );
};

export default Logo;
