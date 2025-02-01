// components/MenuItem.tsx
"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/basketSlice";

interface MenuItemProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  available: boolean;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({
  id,
  name,
  description,
  price,
  available,
}) => {
  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    dispatch(addItem({ id, name, quantity: 1, price }));
  };

  return (
    <div
      style={{ border: "1px solid #ccc", margin: "0.5rem", padding: "0.5rem" }}
    >
      <h3>{name}</h3>
      {description && <p>{description}</p>}
      <p>Price: R$ {price.toFixed(2)}</p>
      <button onClick={handleAddToBasket} disabled={!available}>
        {available ? "Add to Basket" : "Unavailable"}
      </button>
    </div>
  );
};

export default MenuItemComponent;
