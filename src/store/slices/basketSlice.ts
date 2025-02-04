// src/store/slices/basketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketItem {
  id: number;
  name: string;
  detail: string;
  quantity: number;
  price: number;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

/**
 * Represents the basket slice which manages the state of a shopping basket.
 *
 * @remarks
 * This slice contains actions to add, remove, and clear items in the basket.
 *
 * @example
 * // Adding an item:
 * dispatch(addItem({ id: '123', quantity: 2, price: 20 }));
 *
 * @example
 * // Removing an item:
 * dispatch(removeItem({ id: '123', quantity: 1, price: 10 }));
 *
 * @example
 * // Clearing the basket:
 * dispatch(clearBasket());
 *
 * @remarks
 * The addItem reducer will ignore any action with a non-positive quantity. If the item
 * already exists in the basket, its quantity and price are incremented.
 *
 * @remarks
 * The removeItem reducer decreases the quantity and price of the item; if the quantity is
 * less than or equal to zero after the update, the item is removed entirely from the basket.
 *
 * @public
 */

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      if (action.payload.quantity <= 0) return; // Evita adicionar quantidade negativa ou zero
      const existingItem = state.items.find(
        (item) => item.id?.toString() === action.payload.id?.toString()
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.price += action.payload.price;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<BasketItem>) => {
      const existingItem = state.items.find(
        (item) => item.id?.toString() === action.payload.id?.toString()
      );
      if (existingItem) {
        existingItem.quantity -= action.payload.quantity;
        existingItem.price -= action.payload.price;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
