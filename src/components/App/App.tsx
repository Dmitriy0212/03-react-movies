import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!query) return;

    const load = async () => {
      try {
        const data = await fetchMovies(query, page);
        setMovies(data.results);
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    load();
  }, [query, page]);
  return (
    <div className={css.app}>
      <SearchBar
        onSubmit={(q) => {
          setQuery(q);
          setPage(1);
        }}
      />
      <MovieGrid movies={movies} />
    </div>
  );
}

export default App;
