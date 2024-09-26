import { useInfiniteQuery, useQuery, UseQueryOptions } from "react-query";
import { Genre, Main } from "@/types/movies";
import {  fetchMovieDetails, fetchMovieGenres, fetchMovieTrailer, fetchNowPlayingMovies, fetchPopularMovies, fetchRecommendatios, fetchSearchMovies, fetchSimilarMovies, fetchTopRatedMovies, fetchUpcomingMovies } from "@/utils/api";

// INFINITE POPULAR MOVIES
export const usePopularMovies = () => {
  return useInfiniteQuery({
    queryKey: ["popularMovies"],
    queryFn: ({ pageParam = 1 }) => fetchPopularMovies({ pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    keepPreviousData: true,
  });
};

// INFINITE UPCOMING MOVIES
export const useUpcomingMovies = () => {
  return useInfiniteQuery<Main>({
    queryKey: ["upcomingMovies"],
    queryFn: ({ pageParam = 1 }) => fetchUpcomingMovies({ pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};

// MOVIE DETAILS
export const useMovieDetails = (id: number) => {
  return useQuery({
      queryKey: ['movieDetails', id],
      queryFn: () => fetchMovieDetails(id),
  });
};

// MOVIE GENRES 
export const useMovieGenres = () => {
  return useQuery<Genre[]>({
    queryKey: ["movieGenres"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 5, 
  });
};

// INFINITE NOW PLAYING MOVIES
export const useNowPlayingMovies = () => {
  return useInfiniteQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: ({ pageParam = 1 }) => fetchNowPlayingMovies({ pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    keepPreviousData: true,
  });
};

// INFINITE TOP RATED MOVIES
export const useTopRatedMovies = () => {
  return useInfiniteQuery({
    queryKey: ["topRatedMovies"],
    queryFn: ({ pageParam = 1 }) => fetchTopRatedMovies({ pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    keepPreviousData: true,
  });
};

// SIMILAR MOVIES 
export const useSimilarMovies = (
  movieId: number | null,
  options?: UseQueryOptions<any, unknown, any, [string, number | null]>
) => {
  return useQuery(
    ["similarMovies", movieId],
    () => (movieId ? fetchSimilarMovies(movieId) : Promise.resolve([])),
    {
      enabled: movieId !== null,
      staleTime: 1000 * 60 * 5,
      ...options,
    }
  );
};

// SEARCH MOVIES 
export const useSearchMovies = (query: string) => {
  return useQuery(
    ["searchMovies", query],
    () => fetchSearchMovies(query),
    {
      enabled: query.length > 0, // Solo se activa cuando hay consulta
      staleTime: 1000 * 60 * 5, // Cache por 5 minutos
      refetchOnWindowFocus: false,
    }
  );

};

// RECOMMMENDS MOVIES
export const useRecommendationsMovies = (query: number) => {
  return useQuery(
    ["recommendMovies", query],
    () => fetchRecommendatios(query),
    {
      enabled: query > 0, // Solo se activa cuando hay consulta
      staleTime: 1000 * 60 * 5, // Cache por 5 minutos
      refetchOnWindowFocus: false,
    }
  );
};

// HOOK FOR MOVIE TRAILER
export const useMovieTrailer = (movieId: number) => {
  return useQuery(
    ["movieTrailer", movieId],
    () => fetchMovieTrailer(movieId),
    {
      enabled: movieId > 0, // Solo se activa si hay un ID de película válido
      staleTime: 1000 * 60 * 5, // Cache por 5 minutos
      refetchOnWindowFocus: false,
    }
  );
};
