import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './PopularSlice';
import themeReducer from './ThemeSlice';
import cartReducer from './CartSlice'

export const store = configureStore({
  reducer: {
    popular: popularReducer,
    theme: themeReducer,
    cart:cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
