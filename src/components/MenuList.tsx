// src/components/MenuList.tsx
"use client";

import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { useFetchMenu } from "../hooks/useFetchMenu";
import ItemDetailsModal from "./ItemDetailsModal";

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: {
      id: number;
      image: string;
    }[];
  };
  onClick: (item: MenuItemProps["item"]) => void;
}

export default function MenuList() {
  const { menu, loading, error } = useFetchMenu();
  const [selectedItem, setSelectedItem] = useState<
    MenuItemProps["item"] | null
  >(null);

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
              item={{
                id: String(item.id),
                name: item.name || "",
                description: item.description || "",
                price: item.price || 0,
                images: item.images || [],
              }}
              onClick={setSelectedItem}
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
