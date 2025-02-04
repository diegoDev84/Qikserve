// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";

/**
 * The Redux store instance configured with the basket reducer.
 *
 * @remarks
 * This store is created using Redux Toolkit's configureStore API.
 * It sets up state management with a single reducer for handling basket-related state.
 *
 * @public
 */

const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

// Tipos para acesso ao estado e dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
