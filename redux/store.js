import { configureStore, combineReducers } from "@reduxjs/toolkit";

import modalReducer from "./modalReducer";
import navbarReducer from "./navbarReducer";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    navbarMob: navbarReducer,
  },
  devTools: true,
});
