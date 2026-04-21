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
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!query) return;

    const load = async () => {
      try {
        setIsLoading(true);

        const data = await movieService(query, page);
        if (data.results.length === 0) {
          if (page === 1) notifyNoMovies();
          setMovies([]);
          return;
        }

        setMovies(data.results);
      } catch (e) {
        setMovies([]);
        console.error(e);
      } finally {
        setIsLoading(false);
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
          setMovies([]);
        }}
      />
      <MovieGrid movies={movies} isLoading={isLoading} onClick={openModal} />
      <Toaster position="top-center" reverseOrder={false} />
      {isModalOpen && <MovieModal onClose={closeModal} />}
    </div>
  );
}

export default App;
