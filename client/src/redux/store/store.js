//import { applyMiddleware } from "redux";
//import rootReducer from "../rootReducer/booksSlice";
//import thunk from "redux-thunk";
//import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import booksSlice from '../rootReducer/bookSlice'
import cartSlice from "../rootReducer/cartSlice";
import favoriteSlice from "../rootReducer/favoriteSlice";
import userSlice from "../rootReducer/userSlice";
import toogleSlice from '../rootReducer/toogleSlice';
import toogleFavSlice from "../rootReducer/toogleFavSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";



const persistCartConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart']
}

const persistFavoriteConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favorites']
}

const reducer = combineReducers({
  cart: persistReducer(persistCartConfig, cartSlice),
  favorites: persistReducer(persistFavoriteConfig, favoriteSlice),
});

export const store = configureStore({
  reducer: {
    books: booksSlice,
    cart: reducer,
    favorite: reducer,
    user: userSlice,
    toogle: toogleSlice,
    toogleFav: toogleFavSlice
  },
  middleware: [thunk]
});
