import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: false
}
const toogleFavSlice = createSlice({
    name: "toogleFav",
    initialState,
    reducers: {
        closeFav(state) {
            state.isOpen = false;
        },
        toogleFav(state,action) {
            state.isOpen = !state.isOpen;
        },
    },
});

export const {closeFav, toogleFav } = toogleFavSlice.actions;

export default toogleFavSlice.reducer;