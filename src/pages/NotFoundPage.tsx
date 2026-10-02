import { Link } from "react-router-dom";
import { GenreChips, PageTitle, SearchBar } from "../components/Shared";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function NotFoundPage() {
  useDocumentMeta(
    "Page not found",
    "We could not find that page. Search the book catalog or browse a genre.",
  );
  return (
    <div className="not-found-page">
      <PageTitle eyebrow="404 · Page not found" title="This page wandered off.">
        <p>Try searching the catalog, or follow a genre to a new place.</p>
      </PageTitle>
      <SearchBar />
      <section className="not-found-genres">
        <h2>Browse a genre</h2>
        <GenreChips />
      </section>
      <Link className="text-link" to="/">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
