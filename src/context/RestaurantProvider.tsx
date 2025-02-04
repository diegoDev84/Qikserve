// src/context/RestaurantProvider.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useFetchRestaurant, Restaurant } from "@/hooks/useFetchRestaurant";

interface RestaurantContextProps {
  restaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
}

const RestaurantContext = createContext<RestaurantContextProps>({
  restaurant: null,
  loading: true,
  error: null,
});

export const useRestaurantContext = () => useContext(RestaurantContext);

export const RestaurantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { restaurant, loading, error } = useFetchRestaurant();

  return (
    <RestaurantContext.Provider value={{ restaurant, loading, error }}>
      {children}
    </RestaurantContext.Provider>
  );
};
