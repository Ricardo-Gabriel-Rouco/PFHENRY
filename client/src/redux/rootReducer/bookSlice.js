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
          : search.filter((book) => book.title.toLowerCase().includes(action.payload.toLowerCase()));
    },
    filterByAuthor: (state, action) => {
      const allAuthors = state.allBooks;
      state.booksToFilter =
        action.payload === "all"
          ? allAuthors
          : allAuthors.filter((auth) => auth.author === action.payload);
    },

    filterByGenre: (state, action) => {
      const allGenres = state.allBooks;
      allGenres.filter((elem) => elem.genre === action.payload);
      state.booksToFilter =
        action.payload === "all"
          ? allGenres
          : allGenres.filter((elem) => elem.genre === action.payload);
    },
  },
});

export const { addBook, filterByAuthor, filterByGenre,searchBook } = booksSlice.actions;

export default booksSlice.reducer;
