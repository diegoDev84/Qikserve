"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRestaurantContext } from "@/app/layout";

export default function DesktopMenu() {
  const { restaurant, loading, error } = useRestaurantContext();
  const pathname = usePathname(); // Obtém a rota atual

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
