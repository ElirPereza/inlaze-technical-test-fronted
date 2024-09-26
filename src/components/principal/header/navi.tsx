import Link from "next/link";
import React from "react";

const site = [
  { label: "Popular", href: "/" },
  { label: "Favorites", href: "/favorites" },
];

const Navi: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center mt-[13.5px] ">
      {site.map((site) => (
        <Link key={site.label} href={site.href} className="text-white">
          <button
            className="w-[52px] h-[14px] font-inter font-semibold text-[14px] mr-[100px] leading-[14px] 
                 flex items-center justify-center text-[#F6F6F6] 
                 flex-none order-0 grow-0"
          >
            {site.label}
          </button>
        </Link>
      ))}
    </nav>
  );
};

export default Navi;
