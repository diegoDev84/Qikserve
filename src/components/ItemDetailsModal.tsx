// src/components/ItemDetailsModal.tsx
import { useRestaurantContext } from "@/app/layout";
import { useDeviceType } from "@/hooks/useDeviceType";
import { IMenuItem } from "@/hooks/useFetchMenu";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/basketSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IMenuItem | null;
}

export default function ItemDetailsModal({
  isOpen,
  onClose,
  item,
}: ModalProps) {
  const isMobile = useDeviceType();
  const dispatch = useDispatch();
  const [modifierSelected, setModifierSelected] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(1);

  useEffect(() => {
    setModifierSelected(0);
    setNumberOfItems(1);
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
    //verificar se é necessário adicionar o modifierSelected no id
    if (
      item.modifiers &&
      item.modifiers.length > 0 &&
      item.modifiers[0].minChoices > 0
    ) {
      //exibir mensagem de erro
      alert("Selecione pelo menos uma opção/complemento do item");
      return;
    }
    const uniqueId = `${item.id}-${modifierSelected}`;

    // Cria o objeto que será adicionado na cesta.
    const newItem = {
      id: Number(uniqueId),
      name: item.name,
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

  return !isMobile ? (
    <Modal show={isOpen} onHide={onClose} centered>
      {/* Container principal com altura fixa */}
      <div
        style={{
          position: "relative",
          maxHeight: "770px",
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
          <CgClose size={16} color="#4F372F" />
        </div>

        {/* Seção fixa superior: Imagem e descrição */}
        <div style={{ flex: "0 0 auto" }}>
          <div>
            <img
              src={item.images[0].image}
              alt={item.name}
              style={{ width: "100%", height: "auto" }}
            />
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
          {item.modifiers &&
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
                                {modItem.price.toLocaleString(
                                  restaurant.locale,
                                  {
                                    style: "currency",
                                    currency: restaurant.ccy,
                                  }
                                )}
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
                                      ? webSettings.navBackgroundColour
                                      : "#fff",
                                  borderColor:
                                    modifierSelected === modItem.id
                                      ? webSettings.navBackgroundColour
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
            ))}
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
            background: "rgba(255, 255, 255, 0.5)",
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
            <button
              className="btn rounded-circle"
              style={{
                backgroundColor: "#DADADA",
                border: "2px solid #DADADA",
                width: "32px",
                height: "32px",
                fontSize: "3rem",
                display: "flex",
                alignItems: "center",
                paddingBottom: "16px",
                justifyContent: "center",
              }}
              disabled={numberOfItems === 1}
              onClick={() => setNumberOfItems((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>
              {numberOfItems}
            </div>
            <button
              className="btn rounded-circle text-white"
              style={{
                backgroundColor: webSettings.navBackgroundColour,
                width: "32px",
                height: "32px",
                fontSize: "2rem",
                paddingBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setNumberOfItems((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Botão “Add to Order” */}
          <button
            className="btn mt-2"
            style={{
              backgroundColor: webSettings.navBackgroundColour,
              color: "#fff",
              height: "48px",
              fontSize: "18px",
              fontWeight: "500",
              border: "none",
              borderRadius: "40px",
            }}
            onClick={handleAddToOrder}
          >
            Add to Order •{" "}
            {totalOrder().toLocaleString(restaurant.locale, {
              style: "currency",
              currency: restaurant.ccy,
            })}
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
}
