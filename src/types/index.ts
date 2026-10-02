export type Book = {
  id: string;
  slug: string;
  title: string;
  authorId: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  summary: string;
  review: string;
  coverColor: string;
  buyLinks: { label: string; url: string }[];
};

export type Author = {
  id: string;
  slug: string;
  name: string;
  bio: string;
  color: string;
};
export type Post = {
  id: string;
  slug: string;
  title: string;
  category: "Review" | "Reading list" | "Interview" | "News";
  date: string;
  excerpt: string;
  body: string[];
};
export type Genre = { name: string; slug: string; description: string };
export type Shelf = "Want to read" | "Reading" | "Read";
export type ReaderState = {
  shelves: Record<string, Shelf>;
  progress: Record<string, number>;
  followedAuthors: string[];
};
