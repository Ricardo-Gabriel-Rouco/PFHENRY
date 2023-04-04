import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartPersistConfig = {
  key: "cart",
  storage: storage,
};


export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.cart.find(product => product.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Dejo esto, para summar cantidades. Quizás se pueda implementar comprar 2 libros, para mandar uno como regalo.
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload.price
      state.totalPrice = Number(state.totalPrice.toFixed(2)); // Redondea a dos decimales
    },

    removeProduct: (state, action) => {
      const product = state.cart.find(product => product.id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart = state.cart.filter(item => item.id !== action.payload);
        }
        state.totalPrice -= product.price;
        state.totalPrice = Number(state.totalPrice.toFixed(2)); // Redondea a dos decimales

        if (state.totalPrice < 0) {
          state.totalPrice = 0;
        }
      }
    },

    removeAllProducts: (state) => {
      state.cart = [];
      state.totalPrice = 0;
  // Elimina el carrito del almacenamiento persistente
    },

    clearCart: (state, action) => {
      //esta función queda por si necesitamos limpiar base de datos de carrito
    },

    /* updateCart: (state, action) => {
      const { id, quantity } = action.payload;
      const productToUpdate = state.cart.find(product => product.id === id);
      if (productToUpdate) {
        productToUpdate.quantity += quantity;
      }
    } */
  }
}
)
export const { addProduct, removeProduct, removeAllProducts } = cartReducer.actions;
const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer.reducer // utiliza el reducer directamente aquí
);

export default persistedCartReducer;