import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBooks: [],
  booksToFilter: [],
  bookDetail: {},
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      const alfa = action.payload.sort(function (a, b) {
        if (a.title > b.title) return 1;
        if (b.title > a.title) return -1;
        return 0;
      });
      state.allBooks = alfa;
      state.booksToFilter = alfa;
    },

    searchBook: (state, action) => {
      const search = state.allBooks;
      state.booksToFilter =
        action.payload === ""
          ? search
          : search.filter((book) => book.title.toLowerCase() === action.payload.toLowerCase());
    },

    filterByAuthor: (state, action) => {
      const allAuthors = state.allBooks;
      if (state.allBooks.length === state.booksToFilter.length) {
        state.booksToFilter =
          action.payload === "all"
            ? allAuthors
            : allAuthors.filter((auth) => auth.author === action.payload);
      }
      let genre;
      state.booksToFilter.find((books) => {
        genre = books.genre;
        return books.genre;
      });
      if (state.booksToFilter.some((elem) => elem.author === action.payload)) {
        state.booksToFilter =
          action.payload === "all"
            ? allAuthors
            : state.booksToFilter.filter((auth) => auth.author === action.payload);
      } else {
        state.booksToFilter = allAuthors;
        state.booksToFilter =
          action.payload === "all"
            ? allAuthors
            : state.booksToFilter.filter(
                (elem) => elem.genre === genre && elem.author === action.payload
              );
      }
    },

    filterByGenre: (state, action) => {
      const allGenres = state.allBooks;
      if (state.allBooks.length === state.booksToFilter.length) {
        allGenres.filter((elem) => elem.genre === action.payload);
        state.booksToFilter =
          action.payload === "all"
            ? allGenres
            : allGenres.filter((elem) => elem.genre === action.payload);
      }
      let author;
      state.booksToFilter.find((books) => {
        author = books.author;
        return books.genre;
      });
      if (state.booksToFilter.some((elem) => elem.genre === action.payload)) {
        state.booksToFilter =
          action.payload === "all"
            ? allGenres
            : state.booksToFilter.filter((auth) => auth.genre === action.payload);
      } else {
        state.booksToFilter = allGenres;
        state.booksToFilter =
          action.payload === "all"
            ? allGenres
            : state.booksToFilter.filter(
                (elem) => elem.author === author && elem.genre === action.payload
              );
      }
    },
  },
});

export const { addBook, searchBook, filterByAuthor, filterByGenre } = booksSlice.actions;

export default booksSlice.reducer;
