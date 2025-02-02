// src/components/MenuItem.tsx
import React from "react";

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

export default function MenuItem({ item, onClick }: MenuItemProps) {
  console.log(item);

  const img = item.images && item.images.length > 0 ? item.images[0].image : "";

  return (
    <div
      className="row d-flex align-items-center flex-nowrap menu-item"
      title="Clique para ver detalhes"
      onClick={() => onClick(item)}
      style={{ marginTop: "2rem", cursor: "pointer" }}
    >
      <div className="col" style={{ minWidth: 0 }}>
        <div className="item-title">{item.name}</div>
        <div className="text-muted item-description">{item.description}</div>
        <div className="item-price">R${item.price.toFixed(2)}</div>
      </div>

      {img && (
        <div className="col-auto">
          <img src={img} alt={item.name} width="128" height="85" />
        </div>
      )}
    </div>
  );
}
