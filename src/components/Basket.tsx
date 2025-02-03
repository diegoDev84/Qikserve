// src/components/Basket.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Basket() {
  const basketItems = useSelector((state: RootState) => state.basket.items);

  if (basketItems.length === 0) return <p>Seu carrinho está vazio.</p>;

  return (
    <div className="p-4">
      {basketItems.map((item) => (
        <div key={item.id}>
          <p>
            {item.quantity} - {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}
