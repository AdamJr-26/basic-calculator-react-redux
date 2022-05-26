import { configureStore } from '@reduxjs/toolkit';
import colorChanger from '../features/color/calculatorSlice';

export const store = configureStore({
  reducer: {
    color: colorChanger,
  },
});
