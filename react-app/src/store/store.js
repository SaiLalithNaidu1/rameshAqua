import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    cart: cartSlice,
  },
});