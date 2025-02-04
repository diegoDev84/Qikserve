// src/components/MenuItem.tsx
import { useRestaurantContext } from "@/context/RestaurantProvider";
import { IMenuItem } from "@/hooks/useFetchMenu";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

interface MenuItemProps {
  item: IMenuItem;
  onClick: (item: MenuItemProps["item"]) => void;
}

/**
 * Renders a menu item component that displays item details and an optional badge for quantity.
 *
 * @param item - The menu item object containing properties such as name, description, price, and images.
 * @param onClick - A callback function that is invoked when the component is clicked.
 *
 * @remarks
 * This component utilizes the restaurant context to obtain necessary settings like locale and primaryColour,
 * and leverages the Redux store to retrieve the list of basket items. It conditionally displays a badge showing the
 * quantity if the item is present in the basket (and if more than one item exists in the basket).
 *
 * @returns A JSX element representing the menu item with image, description, price, and an optional quantity badge.
 *
 * @example
 * <MenuItem item={exampleItem} onClick={handleMenuItemClick} />
 */

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
