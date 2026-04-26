import type { Movie } from "../../types/movie";
import css from "../MovieGrid/MovieGrid.module.css";

type Props = {
  movie: Movie;
  onClick: (movie: Movie) => void;
};

export default function MoviePost({ movie, onClick }: Props) {
  return (
    <li className={css.card} onClick={() => onClick(movie)}>
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
  );
}
