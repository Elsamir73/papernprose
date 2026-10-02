import authors from "./authors.json";
import books from "./books.json";
import genres from "./genres.json";
import type { Author, Book, Genre, ReaderState } from "../types";

export const allBooks = books as Book[];
export const allAuthors = authors as Author[];
export const allGenres = genres as Genre[];
export const emptyReader: ReaderState = {
  shelves: {},
  progress: {},
  followedAuthors: [],
};
