import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import posts from "../data/posts.json";
import type { Post } from "../types";
import { PageTitle, PostCard } from "../components/Shared";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const articles = posts as Post[];
const categories = ["All", "Review", "Reading list", "Interview", "News"];

export function BlogPage() {
  const [category, setCategory] = useState("All");
  useDocumentMeta(
    "From the reading room",
    "Reviews, reading lists, interviews, and notes from the PapernProse editors.",
  );
  const filtered = articles.filter(
    (post) => category === "All" || post.category === category,
  );
  return (
    <>
      <PageTitle
        eyebrow="Notes for curious readers"
        title="From the reading room."
      >
        <p>
          Reviews, reading lists, conversations, and the occasional note from
          our editors.
        </p>
      </PageTitle>
      <div className="filter-row blog-filters" aria-label="Filter blog posts">
        {categories.map((item) => (
          <button
            key={item}
            className={`filter-chip ${category === item ? "selected" : ""}`}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="post-grid blog-grid">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export function PostPage() {
  const { slug } = useParams();
  const post = articles.find((item) => item.slug === slug);
  useDocumentMeta(
    post?.title ?? "Story not found",
    post?.excerpt ?? "Story not found.",
  );
  if (!post)
    return (
      <div className="empty-state">
        <h1>Story not found.</h1>
        <Link className="button button-dark" to="/blog">
          Back to the reading room
        </Link>
      </div>
    );
  return (
    <article className="article-page">
      <Link className="back-link" to="/blog">
        ← Back to all stories
      </Link>
      <p className="eyebrow">
        {post.category} ·{" "}
        {new Date(`${post.date}T12:00:00`).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <h1>{post.title}</h1>
      <p className="article-deck">{post.excerpt}</p>
      <div className="article-body">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="article-end">—</p>
    </article>
  );
}
