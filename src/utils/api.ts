import axios from "axios";

// MANEJO DE ERROR AXIOS
export const handleAxiosError = (error: unknown, customMessage: string) => {
  if (axios.isAxiosError(error)) {
    throw new Error(customMessage + ": " + error.message);
  } else {
    throw new Error(customMessage);
  }
};

// FETCHING POPULAR MOVIES
export const fetchPopularMovies = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          page: pageParam,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error fetching popular movies");
  }
};

// FETCHING UPCOMING MOVIES
export const fetchUpcomingMovies = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          page: pageParam,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error fetching upcoming movies");
  }
};

// FETCHING MOVIE DETAILS
export const fetchMovieDetails = async (id: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error fetching movie details");
  }
};

// FETCHING MOVIE GENRES
export const fetchMovieGenres = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        },
      }
    );
    return response.data.genres;
  } catch (error) {
    handleAxiosError(error, "Error fetching movie genres");
  }
};

// FETCHING NOW PLAYING MOVIES
export const fetchNowPlayingMovies = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          page: pageParam,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error fetching now playing movies");
  }
};

// FETCHING TOP RATED MOVIES
export const fetchTopRatedMovies = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          page: pageParam,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error fetching top rated movies");
  }
};

// FETCHING SIMILAR MOVIES
export const fetchSimilarMovies = async (movieId: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    handleAxiosError(error, "Error fetching similar movies");
  }
};
// FETCHING SEARCH
export const fetchSearchMovies = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    handleAxiosError(error, "Error fetching similar movies");
  }
};

// FETCHING RECOMMENDATIONS
export const fetchRecommendatios = async (movieId: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error fetching Recommendations movies");
  }
};

// FETCHING MOVIE TRAILER
export const fetchMovieTrailer = async (movieId: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    // Filtrar para encontrar el tráiler oficial
    const trailer = response.data.results.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (!trailer) {
      throw new Error("No trailer found for this movie");
    }

    return trailer; // Retorna solo el tráiler
  } catch (error) {
    handleAxiosError(error, "Error fetching movie trailer");
    throw error;
  }
};
