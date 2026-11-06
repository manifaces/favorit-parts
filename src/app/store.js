import { configureStore } from '@reduxjs/toolkit';

const initialState = {};

export const store = configureStore({
  reducer: (state = initialState) => state
});
