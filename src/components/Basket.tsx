// src/components/Basket.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRestaurantContext } from "@/app/layout";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/basketSlice";

export default function Basket() {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const dispatch = useDispatch();

  const { restaurant } = useRestaurantContext();
  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

  if (basketItems.length === 0) return <p>Seu carrinho está vazio.</p>;

  const addItemToBasket = (id: number) => {
    const name = basketItems.find((item) => item.id === id)?.name;
    const quantity = basketItems.find((item) => item.id === id)?.quantity;
    const totalItemPrice = basketItems.find((item) => item.id === id)?.price;
    const individualPrice = Number(totalItemPrice) / Number(quantity);
    const detail = basketItems.find((item) => item.id === id)?.detail;

    const newItem = {
      id: id,
      name: String(name),
      quantity: 1,
      detail: detail ?? "",
      price: Number(individualPrice),
    };

    // Dispara a action addItem
    dispatch(addItem(newItem));
  };

  return (
    <div>
      {basketItems.map((item) => (
        <div key={item.id} className="mb-3">
          <div className="d-flex justify-content-between">
            <div className="fw-400">{item.name}</div>
            <div className="fw-500">
              {item.price.toLocaleString(restaurant.locale, {
                style: "currency",
                currency: restaurant.ccy,
              })}
            </div>
          </div>
          <div
            style={{
              display: item.detail !== "" ? "block" : "none",
              color: "#5F5F5F",
            }}
            className="fw-400"
          >
            {item.detail}
          </div>
          <div
            className="fw-700 d-flex align-items-center h-100"
            style={{ padding: "8px", gap: "16px" }}
          >
            <button
              className="btn rounded-circle btn-item-basket fs-2"
              style={{
                backgroundColor: webSettings.navBackgroundColour,
                padding: "0px",
                paddingBottom: "5px",
              }}
              // onClick={() => setNumberOfItems((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            {item.quantity}
            <button
              className="btn rounded-circle btn-item-basket"
              style={{
                backgroundColor: webSettings.navBackgroundColour,
                padding: "0px",
              }}
              onClick={() => addItemToBasket(item.id)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
