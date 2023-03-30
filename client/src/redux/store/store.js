//import { applyMiddleware } from "redux";
//import rootReducer from "../rootReducer/booksSlice";
//import thunk from "redux-thunk";
//import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "../rootReducer/bookSlice";
import cartSlice from "../rootReducer/cartSlice";
import favoriteSlice from "../rootReducer/favoriteSlice";
import userSlice from "../rootReducer/userSlice";

const store = configureStore({
  reducer: {
    books: booksSlice,
    cart: cartSlice,
    favorite: favoriteSlice,
    user: userSlice
  },
});

export default store;
