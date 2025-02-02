// app/layout.tsx
"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Providers } from "../store/Provider";
import DesktopMenu from "@/components/DesktopMenu";
import { Restaurant } from "@/hooks/useFetchRestaurant";

interface RestaurantContextProps {
  restaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
}

const RestaurantContext = createContext<RestaurantContextProps>({
  restaurant: null,
  loading: true,
  error: null,
});

export const useRestaurantContext = () => useContext(RestaurantContext);

async function fetchRestaurantData(): Promise<Restaurant> {
  const res = await fetch("/api/restaurant");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRestaurantData()
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Qikserve Restaurant Challenge</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Qikserve Restaurant Challenge" />
      </head>
      <body>
        <Providers>
          <RestaurantContext.Provider value={{ restaurant, loading, error }}>
            <div className="header-container">
              <DesktopMenu />
              <Header />
            </div>
            <main>{children}</main>
          </RestaurantContext.Provider>
        </Providers>
      </body>
    </html>
  );
}
