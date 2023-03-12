import { applyMiddleware } from "redux";
import rootReducer from "../rootReducer/rootReducer";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = configureStore({
  reducer: rootReducer,
  applyMiddleware: applyMiddleware(thunk),
  enhancer: composeWithDevTools(),
});

export default store;
