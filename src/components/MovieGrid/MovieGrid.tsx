import { type Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MoviePost from "../MoviePost/MoviePost";

type MovieGridProps = {
  movies: Movie[];
  isLoading: boolean;
  onClick: (movie: Movie) => void;
};

export default function MovieGrid({
  movies,
  isLoading,
  onClick,
}: MovieGridProps) {
  if (isLoading) {
    return <p>Loading data, please wait...</p>;
  }

  if (!Array.isArray(movies)) {
    return <ErrorMessage />;
  }

  return (
    <>
      {movies.length > 0 && (
        <ul className={css.grid}>
          {movies.map((movie) => (
            <MoviePost
              key={movie.id}
              movie={movie}
              onClick={() => onClick(movie)}
            />
          ))}
        </ul>
      )}
    </>
  );
}
