import "modern-normalize";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { movieService } from "../../services/movieService";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Toaster } from "react-hot-toast";
import { notifyNoMovies } from "../../services/toast";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;

    const load = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await movieService(query, page);

        if (data.results.length === 0) {
          if (page === 1) notifyNoMovies();
          setMovies([]);
          return;
        }

        setMovies(data.results);
      } catch (e) {
        console.error(e);
        setIsError(true);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [query, page]);

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar
        onSubmit={(q) => {
          setQuery(q);
          setPage(1);
          setMovies([]);
        }}
      />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => {
            setSelectedMovie(movie);
          }}
        />
      )}

      <Toaster position="top-center" reverseOrder={false} />

      {selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </div>
  );
}

export default App;
