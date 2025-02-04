// src/components/MenuItem.tsx
import { useRestaurantContext } from "@/app/layout";
import { IMenuItem } from "@/hooks/useFetchMenu";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

interface MenuItemProps {
  item: IMenuItem;
  onClick: (item: MenuItemProps["item"]) => void;
}

export default function MenuItem({ item, onClick }: MenuItemProps) {
  const { restaurant } = useRestaurantContext();
  const basketItems = useSelector((state: RootState) => state.basket.items);

  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

  const img = item.images && item.images.length > 0 ? item.images[0].image : "";

  return (
    <div
      className="row d-flex align-items-center flex-nowrap menu-item"
      title="Clique para ver detalhes"
      onClick={() => onClick(item)}
      style={{ marginTop: "2rem", cursor: "pointer" }}
    >
      <div className="col" style={{ minWidth: 0 }}>
        <div className="d-flex align-items-center">
          {basketItems.length > 1 &&
            basketItems.some(
              (i) => i.name.toString() === item.name.toString()
            ) && (
              <div
                className="badge-quantity"
                style={{ backgroundColor: webSettings.primaryColour }}
              >
                {/* procurar pelo nome na basket */}
                {
                  basketItems.find(
                    (i) => i.name.toString() === item.name.toString()
                  )?.quantity
                }{" "}
              </div>
            )}

          <div className="item-title">{item.name}</div>
        </div>
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
