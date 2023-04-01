import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  favorites: [],
};
const favoritesPersistConfig = {
  key: "favorites",
  storage: storage,
};
const favoritesReducer = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      console.log("Adding favorites:", action.payload);
      state.favorites = [...state.favorites, action.payload];
      console.log(state.favorites);
    },
    deleteFavorite: (state, action) => {
      console.log("Deleting favorites:", action.payload);
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
      console.log(state.favorites);
    },
  },
});

export const { addFavorite, deleteFavorite } = favoritesReducer.actions;
const persistedFavoriteducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer.reducer // utiliza el reducer directamente aquí
);

export default persistedFavoriteducer;
