'use client';
import { configureStore } from '@reduxjs/toolkit';
import pricesReducer from './prices.slice';
import petrolReducer from './petrol.slice';
import DPKReducer from './DPK.slice';
import AGOReducer from './AGO.slice';
import PMSReducer from './PMS.slice';
import LPGReducer from './LPG.slice';

const store = configureStore({
  reducer: {
    LPG: LPGReducer,
    PMS: PMSReducer,
    AGO: AGOReducer,
    DPK: DPKReducer,
    prices: pricesReducer,
    petrol: petrolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
