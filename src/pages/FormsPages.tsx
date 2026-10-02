import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/Shared";
import { allGenres } from "../data/catalog";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function SubmitPage() {
  const [sent, setSent] = useState(false);
  useDocumentMeta(
    "Submit a book",
    "Share a book for consideration by the PapernProse editors.",
  );
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSent(true);
  };
  return (
    <>
      <PageTitle
        eyebrow="For authors and publishers"
        title="Put a book on our desk."
      >
        <p>
          We welcome finished books for review consideration. We reply within 14
          days. We do not accept manuscripts.
        </p>
      </PageTitle>
      {sent ? (
        <div className="form-success" role="status">
          <h2>Thanks for the thoughtful submission.</h2>
          <p>
            Your details are recorded for this demo. Our editors will be in
            touch if there's a fit.
          </p>
        </div>
      ) : (
        <form className="stacked-form" onSubmit={submit}>
          <label>
            Book title
            <input name="title" required maxLength={120} />
          </label>
          <label>
            Author name
            <input name="author" required maxLength={100} />
          </label>
          <label>
            Genre
            <select name="genre" required defaultValue="">
              <option value="" disabled>
                Select a genre
              </option>
              {allGenres.map((genre) => (
                <option key={genre.slug}>{genre.name}</option>
              ))}
            </select>
          </label>
          <label>
            Link to buy or preview
            <input name="link" type="url" required placeholder="https://" />
          </label>
          <label>
            Your email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <button className="button button-dark" type="submit">
            Send for consideration <span aria-hidden="true">↗</span>
          </button>
        </form>
      )}
    </>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  useDocumentMeta("Contact", "Get in touch with the PapernProse team.");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSent(true);
  };
  return (
    <>
      <PageTitle eyebrow="Say hello" title="We'd like to hear from you.">
        <p>
          Questions, reading recommendations, or a note about the site? Send us
          a message.
        </p>
      </PageTitle>
      {sent ? (
        <div className="form-success" role="status">
          <h2>Your note is on its way.</h2>
          <p>
            This demo does not send messages, but the form validated
            successfully.
          </p>
        </div>
      ) : (
        <form className="stacked-form" onSubmit={submit}>
          <label>
            Your name
            <input name="name" required maxLength={100} />
          </label>
          <label>
            Email address
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Subject
            <input name="subject" required maxLength={140} />
          </label>
          <label>
            Message
            <textarea name="message" rows={6} required maxLength={2000} />
          </label>
          <button className="button button-dark" type="submit">
            Send message <span aria-hidden="true">↗</span>
          </button>
        </form>
      )}
    </>
  );
}

const info: Record<string, { title: string; paragraphs: string[] }> = {
  about: {
    title: "Good books, thoughtfully found.",
    paragraphs: [
      "PapernProse is an independent-minded book discovery project built around clear, useful criticism. We write reviews that explain what a book is trying to do and who might enjoy it.",
      "Our catalog is fictional sample content for this demo. We value curiosity, editorial independence, and recommendations that respect different reading tastes.",
    ],
  },
  privacy: {
    title: "Privacy, plainly stated.",
    paragraphs: [
      "This demo stores reading shelves, reading progress, followed authors, and theme preference in your browser localStorage. No account is created and no backend receives this information.",
      "Contact and submission forms validate locally and display a demo confirmation; they do not transmit or retain form entries. A production site would publish a full data-retention and analytics policy here.",
    ],
  },
  terms: {
    title: "Terms of use.",
    paragraphs: [
      "PapernProse is provided as a sample discovery site. Book, author, and article content in this demo is fictional and is not an offer to sell or a claim about a real publication.",
      "You may browse and use the local library tools for personal demonstration. Production terms, accessibility commitments, and dispute provisions require legal review before launch.",
    ],
  },
  "affiliate-disclosure": {
    title: "Affiliate disclosure.",
    paragraphs: [
      "Some links on a production PapernProse site may be affiliate links. If you buy through one, we may earn a commission at no additional cost to you.",
      "Affiliate relationships do not determine our reviews or ratings. All purchase destinations in this demo use placeholder links.",
    ],
  },
};

export function InfoPage() {
  const path =
    window.location.pathname.split("/").filter(Boolean)[0] ?? "about";
  const page = info[path] ?? info.about;
  useDocumentMeta(page.title, page.paragraphs[0]);
  return (
    <>
      <PageTitle eyebrow="PapernProse" title={page.title} />
      <article className="prose-page">
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {path === "about" && (
          <p>
            Browse the <Link to="/books">book catalog</Link>, meet our{" "}
            <Link to="/authors">authors</Link>, or{" "}
            <Link to="/contact">contact the editors</Link>.
          </p>
        )}
      </article>
    </>
  );
}
