// src/components/CheckoutButton.tsx
import { useRestaurantContext } from "@/app/layout";
import { clearBasket } from "@/store/slices/basketSlice";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";

export default function CheckoutButton() {
  const { restaurant } = useRestaurantContext();
  const dispatch = useDispatch();
  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

  const onCheckOut = () => {
    alert("Checkout");
    dispatch(clearBasket());
  };

  return (
    <Button
      primaryColor={webSettings.primaryColour}
      hoverColor={webSettings.primaryColourHover}
      onClick={() => onCheckOut()}
    >
      Checkout now
    </Button>
  );
}
