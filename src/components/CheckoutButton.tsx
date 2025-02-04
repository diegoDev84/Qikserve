// src/components/CheckoutButton.tsx
import { useRestaurantContext } from "@/app/layout";
import { clearBasket } from "@/store/slices/basketSlice";
import React from "react";
import { useDispatch } from "react-redux";

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
    <button
      className="btn mt-2"
      style={{
        backgroundColor: webSettings.navBackgroundColour,
        color: "#fff",
        width: "100%",
        height: "48px",
        fontSize: "18px",
        fontWeight: "500",
        border: "none",
        borderRadius: "40px",
      }}
      onClick={() => onCheckOut()}
    >
      Checkout now
    </button>
  );
}
