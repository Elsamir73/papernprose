import { Link, useParams } from "react-router-dom";
import {
  AuthorCard,
  BookCard,
  BookCover,
  GenreChips,
  PageTitle,
  Rating,
  SectionHeading,
  ShelfSelect,
} from "../components/Shared";
import { allAuthors, allBooks, allGenres } from "../data/catalog";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ReaderState } from "../types";

export function BookPage() {
  const { slug } = useParams();
  const book = allBooks.find((item) => item.slug === slug);
  const author = allAuthors.find((item) => item.id === book?.authorId);
  useDocumentMeta(
    book?.title ?? "Book not found",
    book?.summary ?? "Book not found in our catalog.",
  );
  if (!book || !author) return <NotFoundInline />;
  const related = allBooks
    .filter((item) => item.genre === book.genre && item.id !== book.id)
    .slice(0, 4);
  return (
    <>
      <div className="book-detail">
        <div className="detail-cover">
          <BookCover book={book} size="large" />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">
            {book.genre} · {book.year}
          </p>
          <h1>{book.title}</h1>
          <p className="detail-byline">
            by <Link to={`/authors/${author.slug}`}>{author.name}</Link>
          </p>
          <Rating value={book.rating} />
          <div className="buy-links">
            {book.buyLinks.map((link) => (
              <a
                className="button button-dark"
                key={link.label}
                href={link.url}
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className="affiliate-note">
            We may earn a commission from purchases. See our{" "}
            <Link to="/affiliate-disclosure">affiliate disclosure</Link>.
          </p>
          <div className="detail-actions">
            <ShelfSelect book={book} />
          </div>
          <section className="detail-section">
            <h2>About the book</h2>
            <p>{book.summary}</p>
          </section>
          <section className="detail-section verdict">
            <h2>Our verdict</h2>
            <p>{book.review}</p>
          </section>
          <dl className="book-facts">
            <div>
              <dt>Genre</dt>
              <dd>
                <Link
                  to={`/genre/${allGenres.find((item) => item.name === book.genre)?.slug}`}
                >
                  {book.genre}
                </Link>
              </dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{book.year}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{book.pages} pages</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>
                <Rating value={book.rating} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <section className="content-section related-books">
        <SectionHeading title={`More in ${book.genre}`} />
        <div className="book-grid">
          {related.map((item) => (
            <BookCard key={item.id} book={item} />
          ))}
        </div>
      </section>
    </>
  );
}

export function AuthorsPage() {
  useDocumentMeta(
    "Authors",
    "Meet the fictional writers behind the books we review.",
  );
  return (
    <>
      <PageTitle
        eyebrow="The people behind the pages"
        title="Meet the authors."
      >
        <p>
          Get to know the writers, their work, and the ideas that keep them
          writing.
        </p>
      </PageTitle>
      <div className="author-grid author-grid-page">
        {allAuthors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </>
  );
}

export function AuthorPage() {
  const { slug } = useParams();
  const author = allAuthors.find((item) => item.slug === slug);
  useDocumentMeta(
    author?.name ?? "Author not found",
    author?.bio ?? "Author not found.",
  );
  if (!author) return <NotFoundInline />;
  const books = allBooks.filter((book) => book.authorId === author.id);
  return (
    <>
      <section className="author-profile">
        <div
          className="author-avatar author-avatar-large"
          style={{ backgroundColor: author.color }}
        >
          {author.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
        <div>
          <p className="eyebrow">Author profile</p>
          <h1>{author.name}</h1>
          <p>{author.bio}</p>
          <FollowButton authorId={author.id} />
        </div>
      </section>
      <section className="content-section">
        <SectionHeading title={`Books by ${author.name}`} />
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}

function FollowButton({ authorId }: { authorId: string }) {
  const [reader, setReader] = useLocalStorage<ReaderState>("pp-reader", {
    shelves: {},
    progress: {},
    followedAuthors: [],
  });
  const followed = reader.followedAuthors.includes(authorId);
  return (
    <button
      className={followed ? "button button-outline" : "button button-dark"}
      onClick={() =>
        setReader({
          ...reader,
          followedAuthors: followed
            ? reader.followedAuthors.filter((id: string) => id !== authorId)
            : [...reader.followedAuthors, authorId],
        })
      }
    >
      {followed ? "Following" : "Follow author"}
    </button>
  );
}

export function GenrePage() {
  const { slug } = useParams();
  const genre = allGenres.find((item) => item.slug === slug);
  useDocumentMeta(
    genre?.name ?? "Genre not found",
    genre?.description ?? "Genre not found.",
  );
  if (!genre) return <NotFoundInline />;
  const books = allBooks.filter((book) => book.genre === genre.name);
  return (
    <>
      <PageTitle eyebrow="Browse by genre" title={genre.name}>
        <p>{genre.description}</p>
      </PageTitle>
      <GenreChips active={genre.slug} />
      <section className="content-section">
        <p className="results-count">
          {books.length} books in {genre.name}
        </p>
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}

function NotFoundInline() {
  return (
    <div className="empty-state">
      <h1>We couldn't find that page.</h1>
      <p>Try browsing the catalog instead.</p>
      <Link className="button button-dark" to="/books">
        Browse books
      </Link>
    </div>
  );
}
