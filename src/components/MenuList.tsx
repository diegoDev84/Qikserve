// src/components/MenuList.tsx
"use client";

import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { IMenuItem } from "../hooks/useFetchMenu";
import ItemDetailsModal from "./ItemDetailsModal";
import { useMenuContext } from "@/context/MenuProvider";

/**
 * Renders the menu list.
 *
 * This component is responsible for fetching and displaying a menu. It performs the following tasks:
 * - Uses the `useFetchMenu` hook to retrieve the menu data.
 * - Displays a loading message when data is being fetched.
 * - Displays an error message if the menu cannot be retrieved.
 * - Renders the menu sections along with their items once the data is available.
 * - Handles item selection by updating the local state and displaying the details in a modal.
 *
 * @remarks
 * The component leverages the following hooks and components:
 * - `useState` from React to manage the state of the selected menu item.
 * - `MenuItem` to render each individual item within a section.
 * - `ItemDetailsModal` to show the details of the selected menu item.
 *
 * @returns A JSX element representing the complete menu list with sections and item details modal.
 */

export default function MenuList() {
  const { menu, loading, error } = useMenuContext();
  const [selectedItem, setSelectedItem] = useState<IMenuItem | null>(null);

  if (loading) return <p>Carregando menu...</p>;
  if (error) return <p>Erro ao carregar o menu.</p>;
  if (!menu) return <p>Menu não disponível.</p>;

  return (
    <div>
      {menu.sections.map((section) => (
        <div key={section.id}>
          <h2>{section.name}</h2>
          {section.items.map((item) => (
            <MenuItem
              key={item.id.toString()}
              item={item}
              onClick={(item: IMenuItem) => setSelectedItem(item)}
            />
          ))}
        </div>
      ))}
      <ItemDetailsModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
    </div>
  );
}
