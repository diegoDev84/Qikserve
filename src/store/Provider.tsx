// store/Provider.tsx
"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./index";

/**
 * A component that wraps its children with the Redux store provider.
 *
 * This component uses the Redux Provider to make the store available to all
 * nested components. It should be used to enclose the part of the application
 * that needs access to the Redux state.
 *
 * @param children - The child components that require access to the Redux store.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
