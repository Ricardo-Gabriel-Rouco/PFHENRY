import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBooks: [],
  displayableBooks: [],
  booksToFilter: [],
  filtersApplied: {authors:[],genres:[]},
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, {payload}) => {
      const alfa = payload.sort(function (a, b) {
        if (a.title > b.title) return 1;
        if (b.title > a.title) return -1;
        return 0;
      });
      state.allBooks = alfa;
      console.log(state.allBooks)
      state.booksToFilter = state.displayableBooks = alfa.filter(el=>el.display);
    },

    searchBook: (state, action) => {
      const search = state.displayableBooks;
      state.displayableBooks =
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
        state.booksToFilter = state.displayableBooks;
    },

    filterBooks: (state, {payload}) => {
      const prop = Object.keys(payload)[0]
      const value = Object.values(payload)[0]
      
      if(value === "all")
      {
        state.booksToFilter = state.displayableBooks;
        state.filtersApplied = {...state.filtersApplied, [prop]: []}
      }
      else
      {
        state.booksToFilter = state.booksToFilter.filter((books) => books[prop].includes(value))
        state.filtersApplied = {...state.filtersApplied, [prop]: [...state.filtersApplied[prop], value]};
      }
    },

    removeFilter: (state, {payload}) => {
      const prop = Object.keys(payload)[0]
      const value = Object.values(payload)[0]

      state.filtersApplied[prop] = state.filtersApplied[prop].filter(el=>el!==value)
      
      if (state.filtersApplied.authors.length + state.filtersApplied.genres.length=== 0) 
        state.booksToFilter = state.displayableBooks;
      
      else{
        state.booksToFilter = state.displayableBooks;
  
        Object.keys(state.filtersApplied).forEach((key)=>{
          state.filtersApplied[key].forEach(filter=>{
            state.booksToFilter = state.booksToFilter.filter((books) => books[key].includes(filter))
          })
        })
      }


    },

    orderBy: (state, {payload}) => {
      
      switch (payload) {
        case "min":
          state.booksToFilter.sort(function (a, b) {
            if (a.rating > b.rating) return 1;
            if (a.rating < b.rating) return -1;
            return 0;
          });
          break;
      
        case "max":
          state.booksToFilter.sort(function (a, b) {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;
            return 0;
          });
          break;
        
        case "asc":
          state.booksToFilter.sort(function (a, b) {
            if (a.title > b.title) return 1;
            if (b.title > a.title) return -1;
            return 0;
          });
          break;

        case "desc":
          state.booksToFilter.sort(function (a, b) {
            if (a.title > b.title) return -1;
            if (b.title > a.title) return 1;
            return 0;
          });
          break;
        
        case "minPrice":
          state.booksToFilter.sort(function (a, b) {
            if (a.price > b.price) return 1;
            if (b.price > a.price) return -1;
            return 0;
          });
          break;
          
        case "maxPrice":
          state.booksToFilter.sort(function (a, b) {
            if (a.price > b.price) return -1;
            if (b.price > a.price) return 1;
            return 0;
          });
          break;
          
          default:
            break
      
      }
    },


    reset: (state, action) => {
      state.booksToFilter = state.displayableBooks;
      state.filtersApplied = {authors:[],genres:[]};
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
