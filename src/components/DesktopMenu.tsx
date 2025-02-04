"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRestaurantContext } from "@/app/layout";

/**
 * Renders the DesktopMenu component.
 *
 * This component displays the desktop navigation menu with links to the main sections: "MENU", "ENTRAR", and "CONTATO".
 * It utilizes the restaurant context to retrieve restaurant data, loading, and error states.
 * - If the data is still loading, it renders a loading header.
 * - If there is an error, it renders an error message.
 * - If no restaurant data is found, it displays a "No data" message.
 *
 * The component applies an "active" class to the navigation link that matches the current pathname.
 *
 * @returns {JSX.Element} The rendered desktop menu UI.
 */

export default function DesktopMenu() {
  const { restaurant, loading, error } = useRestaurantContext();
  const pathname = usePathname();

  if (loading) return <header>Loading...</header>;
  if (error) return <header>Error: {error}</header>;
  if (!restaurant) return <header>No data</header>;

  const { webSettings } = restaurant;

  return (
    <div
      className="desktop-menu"
      style={{ backgroundColor: webSettings.navBackgroundColour }}
    >
      <div className="row w-100 d-flex justify-content-center">
        <div
          className={`col-1 d-flex justify-content-center py-2 navLink ${
            pathname === "/" ? "active" : ""
          }`}
        >
          <Link href="/" className="navLink">
            MENU
          </Link>
        </div>
        <div
          className={`col-1 d-flex justify-content-center py-2 navLink ${
            pathname === "/login" ? "active" : ""
          }`}
        >
          <Link href="/login" className="navLink">
            ENTRAR
          </Link>
        </div>
        <div
          className={`col-1 d-flex justify-content-center py-2 navLink ${
            pathname === "/contact" ? "active" : ""
          }`}
        >
          <Link href="/contact" className="navLink">
            CONTATO
          </Link>
        </div>
      </div>
    </div>
  );
}
