import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './PopularSlice';

export const store = configureStore({
  reducer: {
    popular: popularReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
