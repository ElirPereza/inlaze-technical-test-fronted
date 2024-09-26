"use client";
import { useEffect, useState } from "react";
import MovieCard from "@/components/principal/categorias/movie-card";
import { apiClient } from "@/utils/auth";
import axios from "axios"; // Para el fetch de la API de TMDB
import Heart from "@/components/principal/categorias/heart";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite movies IDs from the API
  const fetchFavorites = async () => {
    try {
      const response = await apiClient.get("/favorite");
      const favoriteIds = response.data.map((fav: { itemId: string }) => fav.itemId);

      // Fetch detailed movie data from TMDB for each favorite ID
      const moviePromises = favoriteIds.map((id: string) =>
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
      );
      const moviesData = await Promise.all(moviePromises);
      
      setFavorites(moviesData.map((res) => res.data));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <div>Cargando favoritos...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favoritos</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((item) => (
          <div key={item.id} className="relative">
            <MovieCard
            loading
              id={item.id}
              title={item.title}
              image={item.poster_path} // Asegúrate de usar la propiedad correcta
              release_date={item.release_date}
              rate={item.vote_average}
            />
            <Heart
              itemId={item.id}
              isFavorite={true} 
              onToggleFavorite={(id, isFavorite) => {
                if (!isFavorite) {
                  setFavorites(favorites.filter((fav) => fav.id !== id));
                }
              }}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
