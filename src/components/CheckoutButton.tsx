// src/components/CheckoutButton.tsx
import { useRestaurantContext } from "@/app/layout";
import React from "react";

export default function CheckoutButton() {
  const { restaurant } = useRestaurantContext();
  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

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
      onClick={() => window.alert("Checkout")}
    >
      Checkout now
    </button>
  );
}
