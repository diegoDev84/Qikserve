// app/layout.tsx
"use client";
import React, { useEffect, useState, createContext } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Providers } from "../store/Provider";
import DesktopMenu from "@/components/DesktopMenu";
import { Restaurant } from "@/hooks/useFetchRestaurant";
import { useDeviceType } from "@/hooks/useDeviceType";
import MobileMenu from "@/components/MobileMenu";

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

async function fetchRestaurantData(): Promise<Restaurant> {
  const res = await fetch("/api/restaurant");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

/**
 * RootLayout component which initializes the application layout and fetches restaurant data.
 *
 * This component performs the following:
 * - Fetches restaurant data on component mount and manages the loading and error states.
 * - Provides the restaurant data, loading, and error states via the RestaurantContext to its children.
 * - Conditionally renders either a mobile or desktop menu based on the device type.
 * - Wraps the application in HTML structure with appropriate meta tags and headers.
 *
 * @param children - The child React nodes to render within the main content area.
 *
 * @returns A React element representing the layout of the application with restaurant data context.
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useDeviceType();

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
            <div className="header-container" style={{ overflowX: "hidden" }}>
              {isMobile ? <MobileMenu /> : <DesktopMenu />}
              <Header />
            </div>
            <main>{children}</main>
          </RestaurantContext.Provider>
        </Providers>
      </body>
    </html>
  );
}
