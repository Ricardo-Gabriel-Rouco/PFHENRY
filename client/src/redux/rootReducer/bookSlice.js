import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allbooks: [],
  booksToFilter: [],
  bookDetail: {},
  clean: [],
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
      state.allbooks = alfa;
      state.booksToFilter = alfa;
    },

    filterByAuthor: (state, action) => {
      const allAuthors = state.allbooks;
    },
  },
});

export const { addBook } = booksSlice.actions;

export default booksSlice.reducer;
