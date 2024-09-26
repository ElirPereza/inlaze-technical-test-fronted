import { create } from "zustand";

interface MovieFilterState {
  genre: number | null;
  searchQuery: string ;
  setGenre: (genre: number | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useFilterMovie = create<MovieFilterState>((set) => ({
  genre: null,
  searchQuery: '',
  setGenre: (genre) => set({ genre }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
