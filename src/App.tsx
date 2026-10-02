import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Shared";

const HomePage = lazy(() => import("./pages/HomePage"));
const BooksPage = lazy(() => import("./pages/BooksPage"));
const BookPage = lazy(() =>
  import("./pages/DetailPages").then((module) => ({
    default: module.BookPage,
  })),
);
const AuthorsPage = lazy(() =>
  import("./pages/DetailPages").then((module) => ({
    default: module.AuthorsPage,
  })),
);
const AuthorPage = lazy(() =>
  import("./pages/DetailPages").then((module) => ({
    default: module.AuthorPage,
  })),
);
const GenrePage = lazy(() =>
  import("./pages/DetailPages").then((module) => ({
    default: module.GenrePage,
  })),
);
const BlogPage = lazy(() =>
  import("./pages/BlogPages").then((module) => ({ default: module.BlogPage })),
);
const PostPage = lazy(() =>
  import("./pages/BlogPages").then((module) => ({ default: module.PostPage })),
);
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const SubmitPage = lazy(() =>
  import("./pages/FormsPages").then((module) => ({
    default: module.SubmitPage,
  })),
);
const ContactPage = lazy(() =>
  import("./pages/FormsPages").then((module) => ({
    default: module.ContactPage,
  })),
);
const InfoPage = lazy(() =>
  import("./pages/FormsPages").then((module) => ({ default: module.InfoPage })),
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function LoadingPage() {
  return (
    <div className="loading-state" role="status">
      Opening the reading room...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:slug" element={<BookPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/:slug" element={<AuthorPage />} />
            <Route path="/genre/:slug" element={<GenrePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<PostPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<InfoPage />} />
            <Route path="/privacy" element={<InfoPage />} />
            <Route path="/terms" element={<InfoPage />} />
            <Route path="/affiliate-disclosure" element={<InfoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
