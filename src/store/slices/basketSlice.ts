// src/store/slices/basketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      if (action.payload.quantity <= 0) return; // Evita adicionar quantidade negativa ou zero
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
