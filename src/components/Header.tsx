// src/components/Header.tsx
"use client";
import { useRestaurantContext } from "@/context/RestaurantProvider";
import React from "react";

const Header: React.FC = () => {
  const { restaurant, loading, error } = useRestaurantContext();

  if (loading) return <header>Loading...</header>;
  if (error) return <header>Error: {error}</header>;
  if (!restaurant) return <header>No data</header>;

  const { webSettings } = restaurant;

  return (
    <header>
      {/* Considerar usar o componente <Image /> do Next.js para otimização */}
      <img src={webSettings.bannerImage} alt="logo" width="100%" />
    </header>
  );
};

export default Header;
