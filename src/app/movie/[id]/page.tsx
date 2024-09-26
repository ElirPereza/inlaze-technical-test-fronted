"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Back from "@/components/icons/back";
import {
  useMovieDetails,
  useMovieTrailer,
  useRecommendationsMovies,
} from "@/hook/useMovies";
import { Recommendation } from "@/types/movies";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Componente de la página de película
const MoviePage = ({ params }: { params: { id: string } }) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const router = useRouter();

  const {
    data: movie,
    isLoading,
    isError,
  } = useMovieDetails(Number(params.id));
  const { data: recommendations } = useRecommendationsMovies(Number(params.id));
  const {
    data: trailer,
    isLoading: isTrailerLoading,
    isError: isTrailerError,
  } = useMovieTrailer(Number(params.id));

  const handleTrailerClick = () => {
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    } else {
      alert("Trailer not available.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !movie) {
    return <div>Movie not found</div>;
  }

  // Formatear la duración de la película en horas y minutos
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <main >
      <button
        onClick={() => router.back()}
        className="absolute font-bold md:left-20 md:top-16 left-8 top-12 mb-4"
      >
        <Back className=" h-24 w-24" />
      </button>

      <div
        className="flex w-full flex-col md:p-20 md:flex-row gap-8 shadow-lg"
        style={{
          backgroundImage: `url(${baseUrl}${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col mt-14 md:mt-0 items-center justify-center ">
          <Image
            src={
              movie.poster_path
                ? `${baseUrl}${movie.poster_path}`
                : "/placeholder.svg"
            }
            alt={`${movie.title} Poster`}
            width={305}
            height={395}
            className="shadow-lg"
          />
          <button
            className="mt-4 w-[305px] h-[46px] bg-yellow-500 text-black px-4 py-2 font-semibold"
            onClick={handleTrailerClick}
            disabled={isTrailerLoading || isTrailerError}
          >
            {isTrailerLoading ? "Loading Trailer..." : "Official Trailer"}
          </button>
        </div>

        <div className="flex-1 px-20 ">
          <h1 className="text-4xl font-bold mb-2">
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h1>
          <p className="text-gray-400 mb-4 flex  justify-between w-full">
            {new Date(movie.release_date).toLocaleDateString()} •{" "}
            {formatRuntime(movie.runtime)}
          </p>

          <h2 className="text-2xl font-semibold mb-2">Overview:</h2>
          <p className="mb-4">{movie.overview}</p>

          {/* Barra circular para el porcentaje del voto promedio */}
          <div className="flex items-center mb-4">
            <div className="w-16 h-16">
              <CircularProgressbar
                value={movie.vote_average * 10} // Convertir el rating en porcentaje
                text={`${(movie.vote_average * 10).toFixed(0)}%`}
                styles={buildStyles({
                  textSize: "30px",
                  pathColor: "#61C864", // Color verde
                  textColor: "#fff",
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
            <div className="flex flex-col">
              <span className="ml-4">Users</span>
              <span className="ml-4">Score</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre: any) => (
              <span
                key={genre.id}
                className="bg-yellow-500 text-black px-2 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-8 p-4 md:p-20">
        <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recommendations?.results
            ?.slice(0, 6)
            .map((recommendedMovie: Recommendation) => (
              <div
                key={recommendedMovie.id}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <Image
                  src={
                    recommendedMovie.poster_path
                      ? `${baseUrl}${recommendedMovie.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={recommendedMovie.title}
                  width={150}
                  height={200}
                  className="w-full"
                />
                <p className="p-2 text-center">{recommendedMovie.title}</p>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default MoviePage;
