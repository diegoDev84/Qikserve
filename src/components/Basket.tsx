// src/components/Basket.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRestaurantContext } from "@/app/layout";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "@/store/slices/basketSlice";
import CheckoutButton from "./CheckoutButton";
import { useDeviceType } from "@/hooks/useDeviceType";
import { CgClose } from "react-icons/cg";

export default function Basket({ onClose }: { onClose?: () => void }) {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { restaurant } = useRestaurantContext();
  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

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

  const removeItemFromBasket = (id: number) => {
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

    // Dispara a action removeItem
    dispatch(removeItem(newItem));
  };

  const calculaTotal = () => {
    let total = 0;
    basketItems.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  return (
    <div className={`${isMobile ? "mobile" : "desktop"}-basket`}>
      <div className={`${isMobile ? "mobile" : "desktop"}-basket-header`}>
        <h2>Carrinho</h2>
        <div
          className="position-absolute"
          style={{ right: "16px", top: "18px" }}
          onClick={onClose}
        >
          <CgClose size={16} color="#4F372F" />
        </div>
      </div>
      <div>
        {basketItems.length === 0 ? (
          <div className="desktop-bt-msg">
            <p>Seu carrinho está vazio.</p>
          </div>
        ) : (
          <div>
            <div className="desktop-bt-msg">
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
                      onClick={() => removeItemFromBasket(item.id)}
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
            <div
              className="desktop-basket-footer fw-400 d-flex justify-content-between"
              style={{ fontSize: "16px" }}
            >
              <div>Sub total</div>
              <div className="fw-500">
                {calculaTotal().toLocaleString(restaurant.locale, {
                  style: "currency",
                  currency: restaurant.ccy,
                })}
              </div>
            </div>
            <div
              className="desktop-basket-footer d-flex justify-content-between align-items-center"
              style={{ fontSize: "24px", borderBottom: "none" }}
            >
              <div className="fw-300">Total:</div>
              <div className="fw-500 sf-display">
                {calculaTotal().toLocaleString(restaurant.locale, {
                  style: "currency",
                  currency: restaurant.ccy,
                })}
              </div>
            </div>
            <div
              className={`${
                isMobile
                  ? "position-absolute w-100 px-4 pb-3 bottom-0"
                  : "d-flex justify-content-center px-4 pb-3"
              }`}
            >
              <CheckoutButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
