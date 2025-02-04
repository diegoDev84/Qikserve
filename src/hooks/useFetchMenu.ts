// src/hooks/useFetchMenu.ts
"use client";

import { useEffect, useState } from "react";

export interface IMenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  images: {
    id: number;
    image: string;
  }[];
  modifiers?: {
    id: number;
    items: {
      available: boolean;
      id: number;
      maxChoices: number;
      name: string;
      position: number;
      price: number;
      visible: boolean;
    }[];
    maxChoices: number;
    minChoices: number;
    name: string;
  }[];
}

export interface MenuSection {
  id: number;
  name: string;
  items: IMenuItem[];
  images: { id: number; image: string }[];
}

export interface Menu {
  id: number;
  name: string;
  sections: MenuSection[];
}

/**
 * Fetches menu data from the API.
 *
 * This hook performs a GET request to the "/api/menu" endpoint to retrieve the menu data.
 * It manages the loading, data, and error states associated with the fetch operation.
 *
 * @returns An object containing:
 *  - menu: The fetched menu data or null if not available.
 *  - loading: A boolean flag indicating whether the fetch operation is in progress.
 *  - error: A string describing any error encountered during the fetch process, or null if no error occurred.
 */

export function useFetchMenu() {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isDev =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const apiUrl = isDev
    ? "/api/menu"
    : "https://cdn-dev.preoday.com/challenge/menu";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return { menu, loading, error };
}
