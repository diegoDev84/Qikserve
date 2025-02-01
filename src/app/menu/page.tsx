// app/menu/page.tsx
"use client";
import React from "react";
import { useFetchMenu } from "../../hooks/useFetchMenu";
import MenuItemComponent from "../../components/MenuItem";

const MenuPage: React.FC = () => {
  const { menu, loading, error } = useFetchMenu();

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error}</div>;
  if (!menu) return <div>No menu available.</div>;

  return (
    <div>
      <h2>{menu.name}</h2>
      {menu.sections.map((section) => (
        <div key={section.id}>
          <h3>{section.name}</h3>
          {section.items.map((item) => (
            <MenuItemComponent key={item.id} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
