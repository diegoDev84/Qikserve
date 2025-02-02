// src/hooks/useFetchMenu.ts
"use client";

import { useEffect, useState } from "react";

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  images: {
    id: number;
    image: string;
  }[];
}

export interface MenuSection {
  id: number;
  name: string;
  items: MenuItem[];
  images: { id: number; image: string }[];
}

export interface Menu {
  id: number;
  name: string;
  sections: MenuSection[];
}

export function useFetchMenu() {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/menu")
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
  }, []);

  return { menu, loading, error };
}
