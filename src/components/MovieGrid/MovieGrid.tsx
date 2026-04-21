import { type Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type Props = {
  movies: Movie[];
  isLoading: boolean;
};

export default function MovieGrid({ movies, isLoading }: Props) {
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
            <li key={movie.id} className={css.card}>
              <img
                className={css.image}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/no-image.png"
                }
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
