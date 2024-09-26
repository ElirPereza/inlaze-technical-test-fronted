"use client";
import Heart from "@/components/principal/categorias/heart";
import { useUpcomingMovies } from "@/hook/useMovies";
import { Result } from "@/types/movies";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MainBanner: React.FC = () => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const { data: upcoming } = useUpcomingMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState<Result[]>([]);
  // set 5 movies
  useEffect(() => {
    if (upcoming && upcoming?.pages[0].results?.length > 0) {
      setMovies(upcoming?.pages[0].results?.slice(0, 5));
    }
  }, [upcoming]);
  useEffect(() => {
    if (movies.length === 0) return; 
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <section className="relative w-full h-[800px] overflow-hidden  ">
      {movies.length > 0 ? (
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative w-full h-full flex-shrink-0"
            >
              <Image
                src={`${baseUrl}${movie.backdrop_path}`}
                alt={movie.title}
                fill 
                style={{ objectFit: "cover" }} 
                className="z-0"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0.87deg, #000000 19.5%, rgba(102, 102, 102, 0) 99.2%)",
                }}
              ></div>
              <div className="absolute md:w-[50%] bottom-60 md:left-10 left-0 p-3 md:bottom-[29px] z-10 text-white font-ibm-plex-sans font-bold  text-left">
                <h2 className="leading-10 text-4xl mb-5">{movie.original_title}</h2>
                <p className="leading-6 text-xl ">
                  {movie.overview ? movie.overview : "No overview available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white ">
          Cargando...
        </div>
      )}

      {movies.length > 0 && (
        <div className="absolute bottom-10 right-20 flex gap-10 items-center">
          <div className="relative flex items-center justify-center w-16 h-16 font-bold">
            {movies[currentIndex].vote_average !== undefined ? (
              <CircularProgressbar
                value={movies[currentIndex].vote_average * 10} 
                text={`${(movies[currentIndex].vote_average * 10).toFixed(0)}%`}
                styles={buildStyles({
                  textSize: "30px",
                  pathColor: "#61C864", 
                  textColor: "#fff",
                  trailColor: "#d6d6d6",
                })}
              />
            ) : (
              <p>Sin calificación</p>
            )}
          </div>
          <Heart
            className="w-[40px] h-[40px] ml-3"
            itemId={movies[currentIndex].id} 
            isFavorite={false} 
            onToggleFavorite={()=>{}}
          />
        </div>
      )}
    </section>
  );
};

export default MainBanner;
