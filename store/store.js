"use client";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import animeReducer from "./animeSlice"
import userReducer from "./userSlice"
import adsReducer from "./adsSlice"
const rootReducer = combineReducers({
  animes: animeReducer,
  ads: adsReducer,
  user: userReducer
})
const store=configureStore({
    reducer: rootReducer
})
export default store