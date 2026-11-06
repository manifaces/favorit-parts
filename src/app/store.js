import { configureStore } from '@reduxjs/toolkit';
import { partsReducer } from '@/modules';

export const store = configureStore({
  reducer: {
    parts: partsReducer
  }
});
