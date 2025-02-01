// components/Basket.tsx
"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeItem, clearBasket } from "../store/slices/basketSlice";

const Basket: React.FC = () => {
  const basket = useSelector((state: RootState) => state.basket.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  if (basket.length === 0) {
    return <div>Your basket is empty.</div>;
  }

  const total = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Your Basket</h2>
      <ul>
        {basket.map((item) => (
          <li key={item.id}>
            {item.name} - Qty: {item.quantity} - Price: R${" "}
            {(item.price * item.quantity).toFixed(2)}
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={() => dispatch(clearBasket())}>Clear Basket</button>
    </div>
  );
};

export default Basket;
