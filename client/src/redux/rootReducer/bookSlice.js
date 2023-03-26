import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBooks: [],
  booksToFilter: [],
  filtersApplied: [],
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
<<<<<<< HEAD
          : search.filter((book) => book.title.toLowerCase().includes(action.payload.toLowerCase()));
    },
    filterByAuthor: (state, action) => {
      const allAuthors = state.allBooks;
      state.booksToFilter =
        action.payload === "all"
          ? allAuthors
          : allAuthors.filter((auth) => auth.author === action.payload);
=======
          : search.filter((book) => book.title.toLowerCase() === action.payload.toLowerCase());
    },

    clearSearchResults: (state) => {
      state.booksToFilter = state.allBooks;
>>>>>>> cf6e6d1211c7bb8c9d1d201febc78bcde2948f30
    },

    filterBooks: (state, action) => {
      const reset = state.allBooks;
      state.booksToFilter =
        action.payload[1] === "all"
          ? reset
          : state.booksToFilter.filter((books) => books[action.payload[0]] === action.payload[1]);
      if (state.booksToFilter.length === 0) {
        state.booksToFilter = [{ title: "Product not found" }];
      }
      if (action.payload[1] !== "all") {
        state.filtersApplied.push(action.payload);
      } else {
        state.filtersApplied = [];
      }
    },

    removeFilter: (state, action) => {
      if (state.filtersApplied.length > 0) {
        state.filtersApplied.splice(action.payload, 1);
      }
      state.booksToFilter = state.allBooks;
      state.filtersApplied.forEach((elem) => {
        state.booksToFilter = state.booksToFilter.filter((books) => books[elem[0]] === elem[1]);
      });

      if (state.filtersApplied.length === 0) {
        state.booksToFilter = state.allBooks;
      }
    },

    orderByRating: (state, action) => {
      if (action.payload === "min") {
        state.booksToFilter.sort(function (a, b) {
          if (a.rating > b.rating) return 1;
          if (a.rating < b.rating) return -1;
          return 0;
        });
      } else if (action.payload === "max") {
        state.booksToFilter.sort(function (a, b) {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          return 0;
        });
      }
    },

    reset: (state, action) => {
      action.payload = null;
      state.booksToFilter = state.allBooks;
      state.filtersApplied = [];
    },
  },
});

<<<<<<< HEAD
export const { addBook, filterByAuthor, filterByGenre,searchBook } = booksSlice.actions;
=======
export const {
  addBook,
  searchBook,
  filterBooks,
  removeFilter,
  orderByRating,
  reset,
  clearSearchResults,
} = booksSlice.actions;
>>>>>>> cf6e6d1211c7bb8c9d1d201febc78bcde2948f30

export default booksSlice.reducer;
