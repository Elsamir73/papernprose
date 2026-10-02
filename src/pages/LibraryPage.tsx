import { Link } from "react-router-dom";
import {
  AuthorCard,
  BookCover,
  PageTitle,
  SectionHeading,
} from "../components/Shared";
import { allAuthors, allBooks } from "../data/catalog";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import type { ReaderState } from "../types";

export default function LibraryPage() {
  const [reader, setReader] = useLocalStorage<ReaderState>("pp-reader", {
    shelves: {},
    progress: {},
    followedAuthors: [],
  });
  useDocumentMeta(
    "My library",
    "Your reading shelves, progress, and followed authors.",
  );
  const read = allBooks.filter((book) => reader.shelves[book.id] === "Read");
  const reading = allBooks.filter(
    (book) => reader.shelves[book.id] === "Reading",
  );
  const want = allBooks.filter(
    (book) => reader.shelves[book.id] === "Want to read",
  );
  const followed = allAuthors.filter((author) =>
    reader.followedAuthors.includes(author.id),
  );
  const addProgress = (bookId: string) => {
    const nextProgress = Math.min(100, (reader.progress[bookId] ?? 0) + 10);
    setReader({
      ...reader,
      progress: { ...reader.progress, [bookId]: nextProgress },
      shelves:
        nextProgress === 100
          ? { ...reader.shelves, [bookId]: "Read" }
          : reader.shelves,
    });
  };
  const shelfSection = (title: string, list: typeof allBooks) => (
    <section className="library-section">
      <SectionHeading title={title} />
      {list.length ? (
        <div className="shelf-grid">
          {list.map((book) => (
            <article className="shelf-book" key={book.id}>
              <Link to={`/books/${book.slug}`}>
                <BookCover book={book} />
              </Link>
              <div>
                <h3>
                  <Link to={`/books/${book.slug}`}>{book.title}</Link>
                </h3>
                <p>
                  {
                    allAuthors.find((author) => author.id === book.authorId)
                      ?.name
                  }
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="shelf-empty">
          <p>Your {title.toLowerCase()} shelf is empty.</p>
          <Link className="text-link" to="/books">
            Find a book <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </section>
  );
  return (
    <>
      <PageTitle eyebrow="Your reading life" title="My library">
        <p>
          A little place to keep track of where you've been and what you'd like
          to read next.
        </p>
      </PageTitle>
      <section className="library-stats" aria-label="Reading statistics">
        <div>
          <strong>{read.length}</strong>
          <span>Books read</span>
        </div>
        <div>
          <strong>{reading.length}</strong>
          <span>Reading now</span>
        </div>
        <div>
          <strong>{want.length}</strong>
          <span>Want to read</span>
        </div>
      </section>
      <section className="library-section">
        <SectionHeading title="Currently reading" />
        {reading.length ? (
          <div className="reading-list">
            {reading.map((book) => {
              const progress = reader.progress[book.id] ?? 0;
              return (
                <article className="reading-item" key={book.id}>
                  <Link to={`/books/${book.slug}`}>
                    <BookCover book={book} />
                  </Link>
                  <div className="reading-info">
                    <h3>
                      <Link to={`/books/${book.slug}`}>{book.title}</Link>
                    </h3>
                    <p>
                      {
                        allAuthors.find((author) => author.id === book.authorId)
                          ?.name
                      }
                    </p>
                    <div className="progress-row">
                      <progress
                        value={progress}
                        max="100"
                        aria-label={`${progress}% complete`}
                      />
                      <span>{progress}%</span>
                    </div>
                    <button
                      className="button button-outline progress-button"
                      onClick={() => addProgress(book.id)}
                      disabled={progress >= 100}
                    >
                      +10% read
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="shelf-empty">
            <p>No books in progress yet.</p>
            <Link className="text-link" to="/books">
              Choose your next read <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </section>
      {shelfSection("Want to read", want)}
      {shelfSection("Read", read)}
      <section className="library-section">
        <SectionHeading title="Authors you follow" />
        {followed.length ? (
          <div className="author-grid">
            {followed.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        ) : (
          <div className="shelf-empty">
            <p>Your followed authors will appear here.</p>
            <Link className="text-link" to="/authors">
              Meet the authors <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
