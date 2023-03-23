import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.allbooks.push(action.payload);
    },
  },
});

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
