// src/app/basket/page.tsx
import React from "react";
import Basket from "../../components/Basket";
import CheckoutButton from "../../components/CheckoutButton";

export default function BasketPage() {
  return (
    <div>
      <h2>Carrinho</h2>
      <Basket />
      <CheckoutButton />
    </div>
  );
}
