// hooks/useFetchMenu.ts
import { useEffect, useState } from "react";

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  // Adicione outros campos conforme necessário
}

export interface MenuSection {
  id: number;
  name: string;
  items: MenuItem[];
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
    fetch("https://cdn-dev.preoday.com/challenge/menu", { mode: "no-cors" })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { menu, loading, error };
}
