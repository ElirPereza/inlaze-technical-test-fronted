"use client";
import React from "react";
import { useMovieGenres } from "@/hook/useMovies"; 
import { useFilterMovie } from "@/hook/global/movie-context";
import { Genre } from "@/types/movies"; 

const Filter: React.FC = () => {
  const { data: genres } = useMovieGenres(); 
  const { genre, setGenre, searchQuery, setSearchQuery } = useFilterMovie();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value ? parseInt(e.target.value) : null); 
  };

  return (
    <div className="bg-[#2c2c32] w-full border p-4 md:w-[268px]">
      <h2 className="text-xl font-semibold mb-2">Filter</h2>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Keywords"
          className="w-full p-2 rounded bg-[#3f3f46] text-white"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="genre-select" className="block text-white text-xl font-semibold mb-2">Genre:</label>
        <select
          id="genre-select"
          value={genre ?? ""}
          onChange={handleGenreChange}
          className="w-full p-2 rounded bg-[#3f3f46] text-white"
        >
          <option value="">Select Genre</option>
          {genres?.map((g: Genre) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
