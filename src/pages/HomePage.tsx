import { Link } from "react-router-dom";
import posts from "../data/posts.json";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  AuthorCard,
  BookCard,
  BookCover,
  GenreChips,
  NewsletterForm,
  PostCard,
  Rating,
  SearchBar,
  SectionHeading,
} from "../components/Shared";
import { allAuthors, allBooks } from "../data/catalog";
import type { Post } from "../types";

export default function HomePage() {
  useDocumentMeta(
    "PapernProse",
    "Thoughtful book reviews, reading lists, and author profiles to help you find your next read.",
  );
  const featured = allBooks[0];
  const latest = [...allBooks].sort((a, b) => b.year - a.year).slice(0, 5);
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">A reading life, well considered</p>
          <h1>
            Find your next book,
            <br />
            and know why.
          </h1>
          <p>
            Honest reviews and thoughtful reading lists for wherever your
            curiosity leads.
          </p>
          <SearchBar />
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="sun-disc" />
          <span className="hero-book hero-book-one" />
          <span className="hero-book hero-book-two" />
          <span className="hero-note">
            READ
            <br />
            CURIOUSLY
          </span>
        </div>
        <div className="hero-index">
          ISSUE NO. 01 <span>·</span> AUTUMN 2026
        </div>
      </section>
      <section className="featured-book">
        <div className="featured-cover">
          <BookCover book={featured} size="large" />
          <span className="featured-stamp">
            BOOK
            <br />
            OF THE
            <br />
            WEEK
          </span>
        </div>
        <div className="featured-copy">
          <p className="eyebrow">Book of the week</p>
          <h2>{featured.title}</h2>
          <p className="featured-author">
            by{" "}
            {allAuthors.find((author) => author.id === featured.authorId)?.name}
          </p>
          <Rating value={featured.rating} />
          <p>{featured.summary}</p>
          <p className="verdict-quote">“{featured.review}”</p>
          <Link className="button button-dark" to={`/books/${featured.slug}`}>
            Read review <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="content-section">
        <SectionHeading
          title="New on the shelves"
          link="See all books"
          href="/books"
        />
        <div className="book-grid book-grid-five">
          {latest.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
      <section className="genre-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose a direction</p>
            <h2>Browse by genre</h2>
          </div>
          <p>Start with a feeling. We'll help with the book.</p>
        </div>
        <GenreChips />
      </section>
      <section className="content-section">
        <SectionHeading
          title="Writers worth knowing"
          link="Meet the authors"
          href="/authors"
        />
        <div className="author-grid">
          {allAuthors.slice(0, 4).map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </section>
      <section className="blog-preview">
        <SectionHeading
          title="From the reading room"
          link="All stories"
          href="/blog"
        />
        <div className="post-grid">
          {(posts as Post[]).slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      <section className="newsletter-strip">
        <div>
          <p className="eyebrow">A monthly note</p>
          <h2>Make room for a good book.</h2>
          <p>New reviews and reading lists, chosen with care.</p>
        </div>
        <NewsletterForm />
      </section>
    </>
  );
}
