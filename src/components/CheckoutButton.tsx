// src/components/CheckoutButton.tsx
import React from "react";

export default function CheckoutButton() {
  const handleCheckout = () => {
    // Lógica de checkout (redirecionar, integrar com API, etc.)
    alert("Iniciando o checkout...");
  };

  return <button onClick={handleCheckout}>Finalizar Compra</button>;
}
