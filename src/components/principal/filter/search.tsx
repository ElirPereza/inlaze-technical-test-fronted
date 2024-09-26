"use client"
import IconSearch from "@/components/icons/search";
import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void; 
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query); 
  };

  return (
    <div className="flex flex-col gap-3 w-[228px] mx-5">
      <h2 className="font-inter text-[16px] font-bold leading-[22px] text-left">Search</h2>
      <div className="relative">
        <input
          placeholder="Keywords"
          className="text-white bg-[#1C1C1C] rounded-md p-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); 
            }
          }}
        />
        <IconSearch
          className="absolute left-[220px] top-2 w-5 h-5 cursor-pointer"
          onClick={handleSearch} 
        />
      </div>
    </div>
  );
};

export default Search;
