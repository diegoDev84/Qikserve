// store/Provider.tsx
"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./index";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
