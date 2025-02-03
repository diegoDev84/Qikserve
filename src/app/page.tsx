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

const HomePage: React.FC = () => {
  const { menu, loading, error } = useFetchMenu();
  const isMobile = useDeviceType();

  const [filterQuery, setFilterQuery] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [openedSections, setOpenedSections] = useState<string[]>(
    menu?.sections.map((section) => section.name) ?? []
  );

  useEffect(() => {
    if (menu) {
      setOpenedSections(menu.sections.map((section) => section.name));
    }
  }, [menu]);

  const [openItemDeatils, setOpenItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IMenuItem | null>(null);

  const handleOpenItemDetails = (item: IMenuItem) => {
    setSelectedItem(item);
    setOpenItemDetails(true);
  };

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

  return (
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
            <div className="desktop-basket">
              <div className="desktop-basket-header">
                <h2>Carrinho</h2>
              </div>
              <Basket />

              <div className="desktop-bt-msg">Seu carrinho está vazio</div>
            </div>
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
        </div>
      )}
      <ItemDetailsModal
        item={selectedItem}
        isOpen={openItemDeatils}
        onClose={() => setOpenItemDetails(false)}
      />
    </div>
  );
};

export default HomePage;
