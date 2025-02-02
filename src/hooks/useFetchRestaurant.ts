// src/hooks/useFetchRestaurant.ts
import { useEffect, useState } from "react";

export interface Restaurant {
  id: number;
  name: string;
  address1: string;
  city: string;
  webSettings: {
    bannerImage: string;
    backgroundColour: string;
    primaryColour: string;
    navBackgroundColour: string;
  };
  ccy: string;
  ccySymbol: string;
}

export function useFetchRestaurant() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/restaurant")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching restaurant:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { restaurant, loading, error };
}
