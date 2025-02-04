// src/components/CheckoutButton.tsx
import { useRestaurantContext } from "@/app/layout";
import { clearBasket } from "@/store/slices/basketSlice";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";

/**
 * Renders the checkout button component.
 *
 * This component accesses the current restaurant details from the restaurant context.
 * If no restaurant data is available, it renders a fallback message.
 *
 * When the button is clicked, it executes the checkout process by displaying an alert
 * and dispatching an action to clear the basket.
 *
 * @returns {JSX.Element} The rendered checkout button or a fallback message if restaurant data is missing.
 */

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
      primarycolor={webSettings.primaryColour}
      hovercolor={webSettings.primaryColourHover}
      onClick={() => onCheckOut()}
    >
      Checkout now
    </Button>
  );
}
