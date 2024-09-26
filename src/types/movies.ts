export interface Main {
  dates?: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface Result {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum OriginalLanguage {
  CN = "cn",
  En = "en",
  Hi = "hi",
  Zh = "zh",
}

export interface Genre {
  id: number;
  name: string;
}

export interface Recommendation {
  id: number;
  title: string;
  poster_path: string;
}

export interface RecommendationsResponse {
  results: Recommendation[];
}

// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; 
  rol?: string; 
  deletedAt?: string; 
}

export interface Favorite {
  id: number; 
  itemId: string; 
  liked: boolean; 
  user: User; 
  userEmail: string; 
}
