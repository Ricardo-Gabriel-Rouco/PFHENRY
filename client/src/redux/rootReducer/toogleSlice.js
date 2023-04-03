import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: false
}
const toogleSlice = createSlice({
    name: "toogle",
    initialState,
    reducers: {
        closeCart(state) {
            state.isOpen = false;
        },
        toogleCart(state,action) {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { openCart, closeCart, toogleCart } = toogleSlice.actions;

export default toogleSlice.reducer;