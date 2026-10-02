import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookCard, PageTitle } from "../components/Shared";
import { allAuthors, allBooks, allGenres } from "../data/catalog";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function BooksPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [genre, setGenre] = useState(params.get("genre") ?? "All");
  const [sort, setSort] = useState("Newest");
  useDocumentMeta(
    "Browse books",
    "Search our fictional catalog of reviewed books by title, author, or genre.",
  );
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const results = allBooks.filter((book) => {
      const authorName =
        allAuthors.find((author) => author.id === book.authorId)?.name ?? "";
      const matchText =
        `${book.title} ${book.genre} ${book.summary} ${authorName}`
          .toLowerCase()
          .includes(normalized);
      return matchText && (genre === "All" || book.genre === genre);
    });
    return results.sort((a, b) =>
      sort === "Top rated"
        ? b.rating - a.rating
        : sort === "A to Z"
          ? a.title.localeCompare(b.title)
          : b.year - a.year,
    );
  }, [genre, query, sort]);
  const updateQuery = (value: string) => {
    setQuery(value);
    setParams(value ? { q: value } : {});
  };
  return (
    <>
      <PageTitle eyebrow="The catalog" title="Books worth your time.">
        <p>
          Every book here comes with an honest review. Search by title, writer,
          or the mood you're in.
        </p>
      </PageTitle>
      <section className="catalog-controls">
        <label className="catalog-search">
          <span className="sr-only">Search books</span>
          <input
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Title, author, or keyword"
          />
        </label>
        <label className="sort-control">
          Sort by{" "}
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option>Newest</option>
            <option>Top rated</option>
            <option>A to Z</option>
          </select>
        </label>
      </section>
      <div className="filter-row">
        <button
          className={`filter-chip ${genre === "All" ? "selected" : ""}`}
          onClick={() => setGenre("All")}
        >
          All books
        </button>
        {allGenres.map((item) => (
          <button
            className={`filter-chip ${genre === item.name ? "selected" : ""}`}
            key={item.slug}
            onClick={() => setGenre(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "book" : "books"} found
      </p>
      {filtered.length ? (
        <div className="book-grid">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No books found just yet.</h2>
          <p>Try another title or clear your filters to keep browsing.</p>
          <button
            className="text-button"
            onClick={() => {
              setQuery("");
              setGenre("All");
              setParams({});
            }}
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
