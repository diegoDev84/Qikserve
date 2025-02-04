// src/components/ItemDetailsModal.tsx
import { useDeviceType } from "@/hooks/useDeviceType";
import { IMenuItem } from "@/hooks/useFetchMenu";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/basketSlice";
import Button from "./Button";
import ButtonCircle from "./ButtonCircle";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useRestaurantContext } from "@/context/RestaurantProvider";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IMenuItem | null;
}

/**
 * Displays a modal that presents detailed information about a specific item, including its modifiers,
 * quantity selection, and pricing. It allows users to select optional modifiers, adjust the quantity,
 * and add the item to the order.
 *
 * @param props - The modal properties.
 * @param props.isOpen - A boolean indicating whether the modal is visible.
 * @param props.onClose - A callback function to close the modal.
 * @param props.item - The item object containing details such as name, price, images, description,
 *                     and modifiers to be displayed and processed.
 *
 * @returns A JSX element representing the item details modal if the modal is open and the item data
 *          is provided. Returns null if the modal is not open or the item data is absent.
 */

export default function ItemDetailsModal({
  isOpen,
  onClose,
  item,
}: ModalProps) {
  const isMobile = useDeviceType();
  const dispatch = useDispatch();
  const [modifierSelected, setModifierSelected] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(1);
  interface ModifierItem {
    available: boolean;
    id: number;
    maxChoices: number;
    name: string;
    position: number;
    price: number;
    visible: boolean;
  }
  const [modificadoresReducer, setModificadoresReducer] = useState<
    ModifierItem[]
  >([]);

  useEffect(() => {
    setModifierSelected(0);
    setNumberOfItems(1);

    if (item && item.modifiers && item.modifiers.length > 0) {
      const mod = item.modifiers[0];
      setModificadoresReducer(mod.items);
    }
  }, [item]);

  const { restaurant } = useRestaurantContext();
  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

  if (!isOpen || !item) return null;

  const totalOrder = () => {
    // Converte o preço para Number para garantir que "0" (string) se torne 0 (number)
    const itemPrice = Number(item.price);

    let modPrice = 0;
    if (modifierSelected !== 0 && item.modifiers && item.modifiers.length > 0) {
      const modifier = item.modifiers.find((mod) =>
        mod.items.find(
          (modItem) => modItem.id?.toString() === modifierSelected?.toString()
        )
      );
      if (modifier) {
        const modItem = modifier.items.find(
          (modItem) => modItem.id?.toString() === modifierSelected?.toString()
        );
        modPrice = modItem?.price ?? 0;
      }
    }

    return (itemPrice + modPrice) * numberOfItems;
  };

  const handleAddToOrder = () => {
    if (
      item.modifiers &&
      item.modifiers.length > 0 &&
      item.modifiers[0].minChoices > 0 &&
      modifierSelected === 0
    ) {
      //exibir mensagem de erro
      alert("Selecione pelo menos uma opção/complemento do item");
      return;
    }

    const uniqueId = item.id + modifierSelected;

    // Cria o objeto que será adicionado na cesta.
    const newItem = {
      id: uniqueId,
      name: item.name,
      detail:
        modificadoresReducer.find(
          (modItem) => modItem.id?.toString() === modifierSelected?.toString()
        )?.name ?? "",
      quantity: numberOfItems,
      price: totalOrder(),
    };

    // Dispara a action addItem
    dispatch(addItem(newItem));

    // Fecha o modal
    setNumberOfItems(1);
    setModifierSelected(0);
    onClose();
  };

  const itemDetails = (
    <div
      style={{
        position: "relative",
        maxHeight: !isMobile ? "770px" : "100vh",
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Botão de fechar (sempre visível) */}
      <div
        title="Fechar"
        className="bg-white p-1 rounded-circle d-flex justify-content-center align-items-center"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        <CgClose size={16} color={webSettings.primaryColour} />
      </div>

      {/* Seção fixa superior: Imagem e descrição */}
      <div style={{ flex: "0 0 auto" }}>
        <div>
          {item.images?.length > 0 && (
            <img
              src={item.images[0].image}
              alt={item.name}
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
        <div className="p-4" style={{ background: "#fff" }}>
          <h2>{item.name}</h2>
          <div style={{ letterSpacing: "0.5px", color: "#464646" }}>
            {item.description}
          </div>
        </div>
      </div>

      {/* Área rolável somente dos modifiers */}
      <div
        style={{
          flex: "1 1 auto",
          overflowY: "auto",
          paddingBottom: "70px", // espaço para que o conteúdo não fique "atrás" do painel
        }}
      >
        {item.modifiers ? (
          item.modifiers.map((modifier) => (
            <div key={modifier.id}>
              <div
                style={{
                  padding: "10px 24px",
                  letterSpacing: "0.5px",
                  background: "#F8F9FA",
                  lineHeight: "18.75px",
                }}
              >
                <b style={{ color: "#464646" }}>{modifier.name}</b>
                <div style={{ color: "#464646" }}>
                  Select {modifier.maxChoices} option
                  {modifier.maxChoices > 1 ? "s" : ""}
                </div>
              </div>
              <div className="p-4" style={{ background: "#fff" }}>
                <div>
                  {modifier.items.map(
                    (modItem) =>
                      modItem.available && (
                        <div
                          key={modItem.id}
                          className="d-flex justify-content-between"
                          style={{ height: "68px" }}
                        >
                          <div style={{ lineHeight: "18.75px" }}>
                            <div>{modItem.name}</div>
                            <div>
                              {modItem.price.toLocaleString(restaurant.locale, {
                                style: "currency",
                                currency: restaurant.ccy,
                              })}
                            </div>
                          </div>
                          <div>
                            <input
                              type="radio"
                              className="form-check-input"
                              onClick={() => setModifierSelected(modItem.id)}
                              onChange={() => {}}
                              checked={modifierSelected === modItem.id}
                              style={{
                                cursor: "pointer",
                                backgroundColor:
                                  modifierSelected === modItem.id
                                    ? webSettings.primaryColour
                                    : "#fff",
                                borderColor:
                                  modifierSelected === modItem.id
                                    ? webSettings.primaryColour
                                    : "",
                              }}
                            />
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          //adiciona uma div para suprir espaço atrás do painel
          <div style={{ height: "50px" }}></div>
        )}
      </div>

      {/* Painel fixo do Quantity – sobrepõe o conteúdo rolável */}
      <div
        className="px-4 py-2"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "122px",
          zIndex: 20,
          background: !isMobile ? "rgba(255, 255, 255, 0.5)" : "#fff",
          backdropFilter: "blur(5px)", // efeito de desfoque no que estiver atrás
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Linha dos controles de quantidade */}
        <div
          className="d-flex justify-content-center align-items-center px-4"
          style={{ gap: "30px" }} // define explicitamente a altura para essa linha
        >
          <ButtonCircle
            width="32px"
            height="32px"
            bgcolor="#DADADA"
            hovercolor="#DADADA"
            onClick={() => setNumberOfItems((prev) => Math.max(prev - 1, 1))}
          >
            <FaMinus size={18} color="#fff" />
          </ButtonCircle>
          <div style={{ fontSize: "24px", fontWeight: "600" }}>
            {numberOfItems}
          </div>
          <ButtonCircle
            width="32px"
            height="32px"
            bgcolor={webSettings.primaryColour}
            hovercolor={webSettings.primaryColourHover}
            onClick={() => setNumberOfItems((prev) => prev + 1)}
          >
            <FaPlus size={18} color="#fff" />
          </ButtonCircle>
        </div>
        <div className="mt-2">
          <Button
            primarycolor={webSettings.primaryColour}
            hovercolor={webSettings.primaryColourHover}
            onClick={handleAddToOrder}
          >
            Add to Order •{" "}
            {totalOrder().toLocaleString(restaurant.locale, {
              style: "currency",
              currency: restaurant.ccy,
            })}
          </Button>
        </div>
      </div>
    </div>
  );

  return !isMobile ? (
    <Modal show={isOpen} onHide={onClose} centered>
      {itemDetails}
    </Modal>
  ) : (
    <div
      className="position-fixed"
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {itemDetails}
    </div>
  );
}
