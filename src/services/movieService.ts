import axios from "axios";
import { type Movie } from "../types/movie";

interface MovieResponse {
  length: number;
  page: number;
  results: Movie[];
  total_pages: number;
}

const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const movieService = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await api.get<MovieResponse>("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });
  return data;
};
