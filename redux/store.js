import { configureStore, combineReducers } from "@reduxjs/toolkit";

import modalReducer from "./modalReducer";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
  devTools: true,
});
