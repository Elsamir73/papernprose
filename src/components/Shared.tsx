import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { allAuthors, allBooks, allGenres, emptyReader } from "../data/catalog";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Author, Book, ReaderState, Shelf } from "../types";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="page-shell">
        {children}
      </main>
      <Footer />
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "/"],
    ["Books", "/books"],
    ["Authors", "/authors"],
    ["Genres", "/genre/fantasy"],
    ["Blog", "/blog"],
    ["My Library", "/library"],
    ["Submit a Book", "/submit"],
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="PapernProse home">
          <span className="mark">P</span>
          <span>
            Papern<span className="wordmark-light">Prose</span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">{open ? "Close" : "Open"} menu</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav
          id="primary-nav"
          className={open ? "primary-nav is-open" : "primary-nav"}
          aria-label="Primary navigation"
        >
          {links.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              end={href === "/"}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <section className="footer-about">
          <Link className="wordmark footer-mark" to="/">
            <span className="mark">P</span>
            <span>
              Papern<span className="wordmark-light">Prose</span>
            </span>
          </Link>
          <p>Good books, thoughtfully found.</p>
          <h2>About</h2>
          <div className="footer-about-links">
            <Link to="/about">Our approach</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/submit">Submit a book</Link>
          </div>
        </section>
        <section>
          <h2>Explore</h2>
          <Link to="/books">Books</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/blog">From the blog</Link>
        </section>
        <section>
          <h2>Legal</h2>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/affiliate-disclosure">Affiliate disclosure</Link>
        </section>
      </div>
      <div className="copyright">
        © 2026 PapernProse. Fictional books, considered carefully.
      </div>
    </footer>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"system" | "light" | "dark">(
    "pp-theme",
    "system",
  );
  useEffect(() => {
    if (theme === "system")
      document.documentElement.removeAttribute("data-theme");
    else document.documentElement.dataset.theme = theme;
  }, [theme]);
  const cycle = () => {
    const next =
      theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    setTheme(next);
  };
  return (
    <button
      className="theme-toggle"
      onClick={cycle}
      title={`Theme: ${theme}. Activate to change.`}
      aria-label={`Theme: ${theme}. Activate to change.`}
    >
      <span aria-hidden="true">
        {theme === "dark" ? "◐" : theme === "light" ? "☼" : "◑"}
      </span>
    </button>
  );
}

export function SearchBar({
  initial = "",
  label = "Search books",
}: {
  initial?: string;
  label?: string;
}) {
  const [query, setQuery] = useState(initial);
  return (
    <form className="search-bar" action="/books" role="search">
      <label className="sr-only" htmlFor="book-search">
        {label}
      </label>
      <input
        id="book-search"
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Title, author, or genre"
      />
      <button className="button button-dark" type="submit">
        Search <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export function BookCover({
  book,
  size = "regular",
}: {
  book: Book;
  size?: "regular" | "large";
}) {
  const author = allAuthors.find((item) => item.id === book.authorId);
  return (
    <div
      className={`book-cover ${size === "large" ? "cover-large" : ""}`}
      style={{ backgroundColor: book.coverColor }}
      aria-label={`Cover for ${book.title} by ${author?.name}`}
      role="img"
    >
      <span className="cover-spine" />
      <span className="cover-title">{book.title}</span>
      <span className="cover-rule" />
      <span className="cover-author">{author?.name}</span>
    </div>
  );
}

export function Rating({ value, count }: { value: number; count?: string }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span className="rating" aria-label={`${rounded} out of 5 stars`}>
      <span aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) =>
          index + 0.5 < rounded ? "★" : index < rounded ? "◐" : "☆",
        ).join("")}
      </span>
      <span className="rating-value">{value.toFixed(1)}</span>
      {count && <span className="muted">{count}</span>}
    </span>
  );
}

export function ShelfSelect({ book }: { book: Book }) {
  const [reader, setReader] = useLocalStorage<ReaderState>(
    "pp-reader",
    emptyReader,
  );
  return (
    <label className="shelf-control">
      <span className="sr-only">Add {book.title} to shelf</span>
      <select
        value={reader.shelves[book.id] ?? ""}
        onChange={(event) =>
          setReader({
            ...reader,
            shelves: {
              ...reader.shelves,
              [book.id]: event.target.value as Shelf,
            },
            progress: {
              ...reader.progress,
              ...(event.target.value === "Reading"
                ? { [book.id]: reader.progress[book.id] ?? 0 }
                : {}),
            },
          })
        }
      >
        <option value="">Add to shelf</option>
        <option>Want to read</option>
        <option>Reading</option>
        <option>Read</option>
      </select>
    </label>
  );
}

export function BookCard({ book }: { book: Book }) {
  const author = allAuthors.find((item) => item.id === book.authorId);
  return (
    <article className="book-card">
      <Link className="cover-link" to={`/books/${book.slug}`}>
        <BookCover book={book} />
      </Link>
      <div className="book-card-copy">
        <span className="book-genre">{book.genre}</span>
        <h3>
          <Link to={`/books/${book.slug}`}>{book.title}</Link>
        </h3>
        <p className="book-byline">by {author?.name}</p>
        <Rating value={book.rating} />
        <ShelfSelect book={book} />
      </div>
    </article>
  );
}

export function AuthorCard({ author }: { author: Author }) {
  return (
    <article className="author-card">
      <Link
        to={`/authors/${author.slug}`}
        className="author-avatar"
        style={{ backgroundColor: author.color }}
        aria-label={`View ${author.name}`}
      >
        {author.name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </Link>
      <div>
        <h3>
          <Link to={`/authors/${author.slug}`}>{author.name}</Link>
        </h3>
        <p>{author.bio}</p>
        <span className="muted">
          {allBooks.filter((book) => book.authorId === author.id).length} books
        </span>
      </div>
    </article>
  );
}

export function GenreChips({ active }: { active?: string }) {
  return (
    <div className="genre-chips">
      {allGenres.map((genre) => (
        <Link
          key={genre.slug}
          className={`genre-chip ${active === genre.slug ? "is-active" : ""}`}
          to={`/genre/${genre.slug}`}
        >
          {genre.name}
          <span aria-hidden="true">↗</span>
        </Link>
      ))}
    </div>
  );
}

export function NewsletterForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSent(true);
  };
  return (
    <form className="newsletter-form" onSubmit={submit}>
      {sent ? (
        <p className="success-message" role="status">
          You're on the list. Look out for a note from us.
        </p>
      ) : (
        <>
          <label htmlFor="newsletter-email">
            A good reading note, once a month.
          </label>
          <div>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email address"
            />
            <button className="button button-light" type="submit">
              Sign me up
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export function PageTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {children && <div className="page-intro">{children}</div>}
    </div>
  );
}

export function SectionHeading({
  title,
  link,
  href,
}: {
  title: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {link && href && (
        <Link className="text-link" to={href}>
          {link} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

export function PostCard({ post }: { post: import("../types").Post }) {
  return (
    <article className="post-card">
      <p className="post-meta">
        {post.category} <span>·</span>{" "}
        {new Date(`${post.date}T12:00:00`).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <h3>
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      <Link className="text-link" to={`/blog/${post.slug}`}>
        Read story <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
