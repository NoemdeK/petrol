'use client';
import { configureStore } from '@reduxjs/toolkit';
import pricesReducer from './prices.slice';

const store = configureStore({
  reducer: {
    prices: pricesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
