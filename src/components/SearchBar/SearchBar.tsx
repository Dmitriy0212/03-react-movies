import css from "./SearchBar.module.css";
import { notifyError } from "../../services/toast";
interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const search = formData.get("query") as string;
    if (search.length === 0) {
      notifyError();
      return;
    }
    onSubmit(search);
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <a className={css.link} href="./" rel="noopener noreferrer">
            Powered by TMDB
          </a>
          <form action={handleSubmit} className={css.form}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="on"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </>
  );
}
