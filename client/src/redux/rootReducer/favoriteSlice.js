import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: []
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload)},
        deleteFavorite: (state, action) => {
            state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
        }
    }
});

export const { addFavorite, deleteFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;