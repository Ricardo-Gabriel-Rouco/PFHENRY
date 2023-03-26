import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBooks: [],
  booksToFilter: [],
  filtersApplied: [],
  favorites: [],
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
          : search.filter((book) =>
              book.title.toLowerCase().includes(action.payload.toLowerCase())
            );
    },

    clearSearchResults: (state) => {
      state.booksToFilter = state.allBooks;
    },

    filterBooks: (state, action) => {
      const reset = state.allBooks;
      state.booksToFilter =
        action.payload[1] === "all"
          ? reset
          : state.booksToFilter.filter((books) => books[action.payload[0]] === action.payload[1]);

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

    orderBy: (state, action) => {
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
      } else if (action.payload === "asc") {
        state.booksToFilter.sort(function (a, b) {
          if (a.title > b.title) return 1;
          if (b.title > a.title) return -1;
          return 0;
        });
      } else if (action.payload === "desc") {
        state.booksToFilter.sort(function (a, b) {
          if (a.title > b.title) return -1;
          if (b.title > a.title) return 1;
          return 0;
        });
      } else if (action.payload === "minPrice") {
        state.booksToFilter.sort(function (a, b) {
          if (a.price > b.price) return 1;
          if (b.price > a.price) return -1;
          return 0;
        });
      } else if (action.payload === "maxPrice") {
        state.booksToFilter.sort(function (a, b) {
          if (a.price > b.price) return -1;
          if (b.price > a.price) return 1;
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

export const {
  addBook,
  searchBook,
  filterBooks,
  removeFilter,
  orderBy,
  reset,
  clearSearchResults,
} = booksSlice.actions;

export default booksSlice.reducer;
