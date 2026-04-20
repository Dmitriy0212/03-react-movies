import css from "./SearchBar.module.css";

interface OrderFormProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: OrderFormProps) {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get("query") as string;
    onSubmit(username);
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
              autoComplete="off"
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
