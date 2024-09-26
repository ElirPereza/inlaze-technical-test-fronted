"use client";
import React, { useEffect } from "react";
import MovieCard from "./movie-card";
import {
  usePopularMovies,
  useUpcomingMovies,
  useNowPlayingMovies,
  useTopRatedMovies,
  useSearchMovies, // Asegúrate de importar el nuevo hook
} from "@/hook/useMovies";
import { Result } from "@/types/movies";
import { useFilterMovie } from "@/hook/global/movie-context";
import Link from "next/link";

const CategoryMovie: React.FC = () => {
  const { genre, searchQuery } = useFilterMovie();

  // Fetching data for each category using useInfiniteQuery hooks
  const {
    data: popularMoviesData,
    fetchNextPage: fetchMorePopular,
    hasNextPage: hasNextPopular,
    isFetching: isFetchingPopular,
  } = usePopularMovies();

  const {
    data: nowPlayingMoviesData,
    fetchNextPage: fetchMoreNowPlaying,
    hasNextPage: hasNextNowPlaying,
    isFetching: isFetchingNowPlaying,
  } = useNowPlayingMovies();

  const {
    data: upcomingMoviesData,
    fetchNextPage: fetchMoreUpcoming,
    hasNextPage: hasNextUpcoming,
    isFetching: isFetchingUpcoming,
  } = useUpcomingMovies();

  const {
    data: topRatedMoviesData,
    fetchNextPage: fetchMoreTopRated,
    hasNextPage: hasNextTopRated,
    isFetching: isFetchingTopRated,
  } = useTopRatedMovies();

  // Hook para obtener resultados de búsqueda
  const { data: searchMoviesData, refetch: refetchSearchMovies } =
    useSearchMovies(searchQuery);

  // Extracting movies from paginated data
  const popularMovies: Result[] =
    popularMoviesData?.pages.flatMap((page) => page.results) || [];
  const nowPlayingMovies: Result[] =
    nowPlayingMoviesData?.pages.flatMap((page) => page.results) || [];
  const upcomingMovies: Result[] =
    upcomingMoviesData?.pages.flatMap((page) => page.results) || [];
  const topRatedMovies: Result[] =
    topRatedMoviesData?.pages.flatMap((page) => page.results) || [];

  // Función para filtrar películas
  const filterMovies = (movies: Result[]) => {
    return movies.filter((movie) => {
      const matchesGenre = genre ? movie.genre_ids.includes(genre) : true; // Filtrar por género
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()); // Filtrar por búsqueda
      return matchesGenre && matchesSearch;
    });
  };

  // Filtrar películas para cada categoría
  const filteredPopularMovies = filterMovies(popularMovies);
  const filteredNowPlayingMovies = filterMovies(nowPlayingMovies);
  const filteredUpcomingMovies = filterMovies(upcomingMovies);
  const filteredTopRatedMovies = filterMovies(topRatedMovies);

  // Category mapping
  const categories = [
    {
      title: "Popular",
      movies: filteredPopularMovies,
      loadMore: fetchMorePopular,
      hasNextPage: hasNextPopular,
      isFetching: isFetchingPopular,
    },
    {
      title: "Now Playing",
      movies: filteredNowPlayingMovies,
      loadMore: fetchMoreNowPlaying,
      hasNextPage: hasNextNowPlaying,
      isFetching: isFetchingNowPlaying,
    },
    {
      title: "Upcoming",
      movies: filteredUpcomingMovies,
      loadMore: fetchMoreUpcoming,
      hasNextPage: hasNextUpcoming,
      isFetching: isFetchingUpcoming,
    },
    {
      title: "Top Rated",
      movies: filteredTopRatedMovies,
      loadMore: fetchMoreTopRated,
      hasNextPage: hasNextTopRated,
      isFetching: isFetchingTopRated,
    },
  ];

  // Refetch cuando cambia el searchQuery
  useEffect(() => {
    if (searchQuery) {
      refetchSearchMovies();
    }
  }, [searchQuery, refetchSearchMovies]);

  return (
    <div className="w-full md:w-[calc(100%-268px)] px-4 md:px-10 mx-auto bg-[#3f3f46] ">
      {categories.map((category) => (
        <div key={category.title} className="my-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
            {category.loadMore && category.hasNextPage && (
              <div className="flex justify-end mt-4">
                <button
                  disabled={category.isFetching}
                  onClick={() => category.loadMore()}
                  className="bg-[#F0B90B] text-white mb-4 px-4 py-2 rounded"
                >
                  {category.isFetching ? "Cargando..." : "Ver más"}
                </button>
              </div>
            )}
          </div>

          <div className="flex overflow-auto gap-4 whitespace-nowrap">
            {category.movies.map((movie: Result) => (
                <MovieCard
                key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  image={movie.poster_path || "/default-image.jpg"}
                  release_date={movie.release_date}
                  rate={movie.vote_average}
                  loading={category.isFetching} // Usar isFetching de la categoría
                />
            ))}
          </div>
        </div>
      ))}
      {searchQuery && searchMoviesData?.length > 0 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">Resultados de Búsqueda</h2>
          <div className="flex overflow-auto gap-4 whitespace-nowrap">
            {searchMoviesData.slice(0, 20).map((movie: Result) => (
              <MovieCard
                id={movie.id}
                key={movie.id}
                title={movie.title}
                image={movie.poster_path || "/default-image.jpg"}
                release_date={movie.release_date}
                rate={movie.vote_average}
                loading={isFetchingPopular} // O el estado de carga que sea relevante
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMovie;
