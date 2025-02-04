// src/context/MenuProvider.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useFetchMenu, Menu } from "@/hooks/useFetchMenu";

interface MenuContextProps {
  menu: Menu | null;
  loading: boolean;
  error: string | null;
}

const MenuContext = createContext<MenuContextProps>({
  menu: null,
  loading: true,
  error: null,
});

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const { menu, loading, error } = useFetchMenu();

  return (
    <MenuContext.Provider value={{ menu, loading, error }}>
      {children}
    </MenuContext.Provider>
  );
};
