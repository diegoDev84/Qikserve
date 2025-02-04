// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { IMenuItem, useFetchMenu } from "../hooks/useFetchMenu";
import MenuItemComponent from "../components/MenuItem";
import SearchBar from "@/components/SearchBar";
import { OverlayTrigger, Spinner } from "react-bootstrap";
import { normalizedText } from "@/functions/normalizedText";
import SectionFilter from "@/components/SectionFilter";
import { GrDown, GrUp } from "react-icons/gr";
import { useDeviceType } from "@/hooks/useDeviceType";
import ItemDetailsModal from "@/components/ItemDetailsModal";
import Basket from "@/components/Basket";
import { useRestaurantContext } from "./layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const HomePage: React.FC = () => {
  const { menu, loading, error } = useFetchMenu();
  const { restaurant } = useRestaurantContext();
  const isMobile = useDeviceType();
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const [openBasket, setOpenBasket] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [filterSection, setFilterSection] = useState<string>("");

  const [openedSections, setOpenedSections] = useState<string[]>(
    menu?.sections.map((section) => section.name) ?? []
  );

  useEffect(() => {
    if (menu) {
      setOpenedSections(menu.sections.map((section) => section.name));
    }
  }, [menu]);

  const [openItemDetails, setOpenItemDetails] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IMenuItem | null>(null);

  const handleOpenItemDetails = (item: IMenuItem) => {
    setSelectedItem(item);
    setOpenItemDetails(true);
  };

  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

  if (loading)
    return (
      <div
        className="text-center"
        style={{
          height: "calc(100vh - 56px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Spinner
            animation="border"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div>Aguarde, estamos carregando os melhores pratos para você!</div>
        </div>
      </div>
    );
  if (error) return <div>Error loading menu: {error}</div>;
  if (!menu) return <div>No menu available.</div>;

  return isMobile && openItemDetails ? (
    <ItemDetailsModal
      item={selectedItem}
      isOpen={openItemDetails}
      onClose={() => setOpenItemDetails(false)}
    />
  ) : !openBasket ? (
    <div className="container">
      <div className="row">
        <SearchBar onSearch={setFilterQuery} />
      </div>
      <div className="row wrap-content">
        <div className="col-lg-8 col-sm-12">
          <div className="main-content">
            <SectionFilter
              onSectionSelect={setFilterSection}
              sections={menu.sections}
            />
            {menu.sections
              .filter(
                (section) =>
                  // Se nenhuma seção estiver selecionada, mostra todas
                  !filterSection || section.name === filterSection
              )
              .map((section) => {
                // Filtra os itens que correspondem ao nome digitado
                const filteredItems = section.items.filter((item) =>
                  normalizedText(item.name).includes(
                    normalizedText(filterQuery)
                  )
                );

                // Se não houver itens filtrados, não renderiza a seção
                if (filteredItems.length === 0) return null;

                return (
                  <div key={section.id} className="mb-5 mt-5">
                    <div className=" d-flex justify-content-between">
                      <h2>{section.name}</h2>
                      {/* abre e fecha section */}
                      <div style={{ cursor: "pointer" }}>
                        {openedSections.includes(section.name) ? (
                          <div
                            onClick={() =>
                              setOpenedSections(
                                openedSections.filter(
                                  (name) => name !== section.name
                                )
                              )
                            }
                          >
                            <GrUp size={24} />
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              setOpenedSections([
                                ...openedSections,
                                section.name,
                              ])
                            }
                          >
                            <GrDown size={24} />
                          </div>
                        )}
                      </div>
                    </div>
                    {filteredItems.map((item) =>
                      !openedSections.includes(section.name) ? null : (
                        <MenuItemComponent
                          key={item.id.toString()}
                          item={item}
                          onClick={() => handleOpenItemDetails(item)}
                        />
                      )
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        {!isMobile && (
          <div className="col-lg-4 col-sm-12">
            <Basket />
          </div>
        )}
      </div>
      {isMobile && (
        // card view alergy information
        <div
          style={{
            background: "#F8F9FA",
            padding: "33px",
            width: "100vw",
            marginLeft: "-15px",
            marginTop: "20px",
          }}
        >
          <div className="row bg-white">
            <div className="col-12">
              <OverlayTrigger
                key="top"
                placement="top"
                trigger={"click"}
                overlay={
                  <div
                    style={{
                      background: "rgba(43, 35, 35, 0.85)",
                      padding: "10px",
                      color: "white",
                      borderRadius: 3,
                      maxWidth: 350,
                    }}
                  >
                    <div>
                      This is a card that shows the allergy information of the
                      restaurant.
                    </div>
                  </div>
                }
              >
                <div
                  className="card-title text-center"
                  style={{
                    textDecoration: "underline",
                    color: "#4F372F",
                    fontWeight: "700",
                  }}
                >
                  View allergy information
                </div>
              </OverlayTrigger>
            </div>
          </div>
          {basketItems.length > 0 && (
            <div className="mt-4 border-top" style={{ margin: "-33px" }}>
              <div className="px-4 pb-4">
                <button
                  className="btn mt-2 fw-500"
                  style={{
                    backgroundColor: webSettings.navBackgroundColour,
                    color: "#fff",
                    width: "100%",
                    height: "48px",
                    fontSize: "18px",
                    border: "none",
                    borderRadius: "40px",
                    letterSpacing: "0.75px",
                  }}
                  onClick={() => setOpenBasket(true)}
                >
                  Your Basket • {basketItems.length} item
                  {basketItems.length > 1 && "s"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <ItemDetailsModal
        item={selectedItem}
        isOpen={openItemDetails}
        onClose={() => setOpenItemDetails(false)}
      />
    </div>
  ) : (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: "100vh",
      }}
    >
      <Basket onClose={() => setOpenBasket(false)} />
    </div>
  );
};

export default HomePage;
