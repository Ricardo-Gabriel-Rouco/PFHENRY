import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getFavorites } from "../../firebase/firestore/favorites";

const initialState = {
    favorites: []
};
const favoritesPersistConfig = {
    key: "favorites",
    storage: storage,
};
const favoritesReducer = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites = [...state.favorites, action.payload];

        },
        deleteFavorite: (state, action) => {
            state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
        },

        removeAllFavorites: (state) => {
            state.favorites = [];
        },
        addFavoritesDB: (state, action) => {
            state.favorites = action.payload;

        }
    }
})


export const { addFavorite, deleteFavorite, removeAllFavorites, addFavoritesDB } = favoritesReducer.actions;
const persistedFavoriteducer = persistReducer(
    favoritesPersistConfig,
    favoritesReducer.reducer // utiliza el reducer directamente aquí
);

export default persistedFavoriteducer;