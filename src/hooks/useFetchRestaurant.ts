// src/hooks/useFetchRestaurant.ts
import { useEffect, useState } from "react";

export interface Restaurant {
  id: number;
  name: string;
  internalName: string;
  description: string | null;
  address1: string;
  city: string;
  webSettings: {
    bannerImage: string;
    backgroundColour: string;
    primaryColour: string;
    primaryColourHover: string;
    navBackgroundColour: string;
  };
  ccy: string;
  ccySymbol: string;
  locale: string;
}

/**
 * A custom React hook that fetches restaurant data from the "/api/restaurant" endpoint.
 *
 * This hook manages the network request process by maintaining loading and error state.
 * It returns an object with the following properties:
 *
 * - restaurant: The fetched restaurant data, or null if the data is not yet available or if an error occurred.
 * - loading: A boolean indicating whether the fetch request is currently in progress.
 * - error: A string containing any error message that occurred during the fetch, or null if no error occurred.
 *
 * @returns An object containing the restaurant data, loading status, and error message.
 */

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
