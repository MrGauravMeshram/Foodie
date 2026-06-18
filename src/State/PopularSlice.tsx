import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopularState {
  selectedCategory: string;
}

const initialState: PopularState = {
  selectedCategory: 'Burger',
};

export const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory } = popularSlice.actions;
export default popularSlice.reducer;
