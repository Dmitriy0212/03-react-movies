import { type Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
type Props = {
  movies: Movie[];
};

export default function MovieGrid({ movies }: Props) {
  console.log(movies);
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.card}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
          <h2 className={css.title}>{movie.title}</h2>
        </li>
      ))}
    </ul>
  );
}
