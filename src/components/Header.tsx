// components/Header.tsx
"use client";
import React from "react";
import { useFetchRestaurant } from "../hooks/useFetchRestaurant";

const Header: React.FC = () => {
  const { restaurant, loading, error } = useFetchRestaurant();

  if (loading) return <header>Loading...</header>;
  if (error) return <header>Error: {error}</header>;
  if (!restaurant) return <header>No data</header>;

  const { name, webSettings } = restaurant;

  return (
    <header
      style={{
        backgroundColor: webSettings.navBackgroundColour,
        backgroundImage: `url(${webSettings.bannerImage})`,
        backgroundSize: "cover",
        color: "#fff",
        padding: "1rem",
      }}
    >
      <h1>{name}</h1>
    </header>
  );
};

export default Header;
