// src/components/MenuItem.tsx
import { useRestaurantContext } from "@/app/layout";
import { IMenuItem } from "@/hooks/useFetchMenu";
import React from "react";

interface MenuItemProps {
  item: IMenuItem;
  onClick: (item: MenuItemProps["item"]) => void;
}

export default function MenuItem({ item, onClick }: MenuItemProps) {
  const { restaurant } = useRestaurantContext();
  if (!restaurant) return <div>No data</div>;

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
        <div className="item-price">
          {item.price.toLocaleString(restaurant.locale, {
            style: "currency",
            currency: restaurant.ccy,
          })}
        </div>
      </div>

      {img && (
        <div className="col-auto">
          <img src={img} alt={item.name} width="128" height="85" />
        </div>
      )}
    </div>
  );
}
