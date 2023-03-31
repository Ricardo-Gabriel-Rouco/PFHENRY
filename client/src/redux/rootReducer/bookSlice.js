import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBooks: [],
  booksToFilter: [],
  filtersApplied: [],
  displayCard: true,
};

const booksSlice = createSlice({
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
      if (state.booksToFilter.length === 0) {
        alert('Book not found');
        state.booksToFilter = search;
      }
    },
    


    clearSearchResults: (state) => {
        state.booksToFilter = state.allBooks;
    },

    filterBooks: (state, action) => {
      console.log(action.payload)
      state.booksToFilter =
        action.payload[1] === "all"
          ? state.allBooks
          : state.booksToFilter.filter((books) => books[action.payload[0]]?books[action.payload[0]].includes(action.payload[1]):false);

      if (action.payload[1] !== "all") {
        state.filtersApplied.push(action.payload);
      } else {
        state.filtersApplied = [];
      }

      if (state.booksToFilter.length === 0) {
        state.displayCard = false;
      }
    },

    removeFilter: (state, action) => {
      if (state.filtersApplied.length > 0) {
        state.filtersApplied.splice(action.payload, 1);
      }
      state.booksToFilter = state.allBooks;
      state.filtersApplied.forEach((elem) => {
        state.booksToFilter = state.booksToFilter.filter((books) => books[elem[0]]?books[elem[0]].includes(elem[1]):false);
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

    display: (state, action) => {
      console.log(state.booksToFilter.length);
      if (!state.booksToFilter.length && state.allBooks.length) {
        state.displayCard = false;
      } else {
        state.displayCard = action.payload;
      }
    },

    reset: (state, action) => {
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
  display,
} = booksSlice.actions;

export default booksSlice.reducer;
