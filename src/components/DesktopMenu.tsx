// src/components/DesktopMenu.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRestaurantContext } from "@/app/layout";

export default function DesktopMenu() {
  const { restaurant, loading, error } = useRestaurantContext();

  if (loading) return <header>Loading...</header>;
  if (error) return <header>Error: {error}</header>;
  if (!restaurant) return <header>No data</header>;

  return (
    <div className="desktop-menu">
      <nav className="nav">
        <Link href="/" className="navLink">
          MENU
        </Link>
        <Link href="/entrar" className="navLink">
          ENTRAR
        </Link>
        <Link href="/contato" className="navLink">
          CONTATO
        </Link>
      </nav>
    </div>
  );
}
