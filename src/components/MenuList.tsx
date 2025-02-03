// src/components/MenuList.tsx
"use client";

import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { IMenuItem, useFetchMenu } from "../hooks/useFetchMenu";
import ItemDetailsModal from "./ItemDetailsModal";

export default function MenuList() {
  const { menu, loading, error } = useFetchMenu();
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
