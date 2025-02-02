// src/app/menu/page.tsx
import React from "react";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/CategoryFilter";
import MenuList from "../../components/MenuList";

export default function MenuPage() {
  return (
    <div>
      <h2>Menu</h2>
      <SearchBar />
      <CategoryFilter />
      <MenuList />
    </div>
  );
}
