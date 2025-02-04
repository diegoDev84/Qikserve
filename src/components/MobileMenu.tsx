"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRestaurantContext } from "@/app/layout";
import { BiMenu } from "react-icons/bi";

export default function MobileMenu() {
  const { restaurant, loading, error } = useRestaurantContext();
  const pathname = usePathname(); // Obtém a rota atual
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return <header>Loading...</header>;
  if (error) return <header>Error: {error}</header>;
  if (!restaurant) return <header>No data</header>;

  return (
    <div>
      <div
        className="desktop-menu text-white flex justify-content-between align-items-center"
        style={{ backgroundColor: restaurant.webSettings.navBackgroundColour }}
      >
        {/* Nome da Rota Atual */}
        <div className="mx-auto">
          {/* primeira letra maiuscula */}
          {pathname === "/"
            ? "Menu"
            : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)}
        </div>
      </div>
      {/* Botão de Menu */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white focus:outline-none"
        style={{ position: "absolute", top: 3, right: 3, padding: "10px" }}
      >
        <BiMenu size={28} />
      </div>

      {/* Menu Dropdown */}
      {menuOpen && (
        <div
          className="mobile-menu row d-flex justify-content-center mx-auto"
          style={{
            backgroundColor: restaurant.webSettings.navBackgroundColour,
          }}
        >
          <div
            className={`col-4 d-flex justify-content-center py-2 navLink ${
              pathname === "/" ? "active" : ""
            }`}
          >
            <Link href="/" className="navLink">
              MENU
            </Link>
          </div>
          <div
            className={`col-4 d-flex justify-content-center py-2 navLink ${
              pathname === "/login" ? "active" : ""
            }`}
          >
            <Link href="/login" className="navLink">
              ENTRAR
            </Link>
          </div>
          <div
            className={`col-4 d-flex justify-content-center py-2 navLink ${
              pathname === "/contact" ? "active" : ""
            }`}
          >
            <Link href="/contact" className="navLink">
              CONTATO
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
