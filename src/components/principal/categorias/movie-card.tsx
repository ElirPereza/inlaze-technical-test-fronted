"use client";
import Heart from "@/components/principal/categorias/heart";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const baseUrl = "https://image.tmdb.org/t/p/original/";

interface propsType {
  id: number;
  title: string;
  image: string;
  release_date: string;
  rate: number;
  loading: boolean;
}

export default function MovieCard(props: propsType) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleFavorite = (id: number, favorite: boolean) => {
    setIsFavorite(favorite);
  };
  return (
    <li className="flex flex-col bg-[#262626] rounded-2xl w-[240px] h-[360px] gap-2">
      <Link href={`/movie/${props.id}`} key={props.id}>
        <div
          className="relative w-[240px] h-[223px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={
              props.image ? `${baseUrl}${props.image}` : "/fallback-image.jpg"
            }
            alt={
              props.title ? `Poster of ${props.title}` : "Poster not available"
            }
            width={200}
            height={223}
            loading="lazy"
            className="w-full h-[223px] rounded-t-[16px]"
          />
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[16px] text-white text-center">
              <span>Click to see more</span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-2 w-[200px] pb-4">
        <div className="flex flex-col items-start gap-2 w-full px-4">
          <h2 className="font-inter font-bold text-[14px] leading-[20px] text-[#F6F6F6] text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {props.title ? props.title : "No available..."}
          </h2>
          <p className="font-inter font-normal text-[9px] leading-[10px] text-[#F6F6F6] text-center">
            {props.release_date
              ? new Date(props.release_date).toDateString()
              : "No release date"}
          </p>
        </div>
        <div className="flex justify-center gap-10 items-center w-[240px] ">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[#F6F6F6] text-sm">Rating:</p>
            <div className="flex items-center justify-center w-10 h-10 ">
              {props.rate ? (
                <CircularProgressbar
                  styles={buildStyles({
                    textSize: 20,
                    pathColor: "#61C864",
                    textColor: "#ffffff",
                  })}
                  value={(props.rate * 100) / 10}
                  text={`${(props.rate * 100) / 10}%`}
                />
              ) : (
                <p className="text-[#F6F6F6] text-xs">No rating available</p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[#F6F6F6] text-sm">Favorites:</p>
            <Heart
              itemId={props.id} 
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite} 
            />
          </div>
        </div>
      </div>
    </li>
  );
}
