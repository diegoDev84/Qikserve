// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { IMenuItem } from "@/hooks/useFetchMenu";
import MenuItemComponent from "../components/MenuItem";
import SearchBar from "@/components/SearchBar";
import { OverlayTrigger, Spinner } from "react-bootstrap";
import { normalizedText } from "@/functions/normalizedText";
import SectionFilter from "@/components/SectionFilter";
import { GrDown, GrUp } from "react-icons/gr";
import { useDeviceType } from "@/hooks/useDeviceType";
import ItemDetailsModal from "@/components/ItemDetailsModal";
import Basket from "@/components/Basket";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Button from "@/components/Button";
import { useRestaurantContext } from "../context/RestaurantProvider";
import { useMenuContext } from "@/context/MenuProvider";

/**
 * HomePage component that displays the restaurant menu and basket.
 *
 * This component performs the following operations:
 * - Fetches the menu data using a custom hook and retrieves restaurant context.
 * - Displays a loading spinner when data is being fetched.
 * - Shows error messages if fetching the menu fails.
 * - Renders a searchable and filterable menu with sections and items.
 * - Manages the state for opened sections, selected menu item, and modal visibility.
 * - Offers different layouts based on the device type:
 *   - For mobile devices, it displays an item details modal.
 *   - For larger devices, it renders the basket component alongside the menu.
 * - Provides a toggle mechanism to collapse or expand each menu section.
 * - Handles displaying basket items and uses a modal to show item details.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */

const HomePage: React.FC = () => {
  const { menu, loading, error } = useMenuContext();
  const { restaurant } = useRestaurantContext();
  const isMobile = useDeviceType();
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const [openBasket, setOpenBasket] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [filterSection, setFilterSection] = useState<string>("");
  const [openedSections, setOpenedSections] = useState<string[]>(
    menu?.sections?.map((section) => section.name) ?? []
  );

  console.log(menu);
  console.log(restaurant);

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

  if (!restaurant) return <div>No restaurant data available.</div>;

  const { webSettings } = restaurant;

  if (loading)
    return (
      <div
        className="text-center d-flex justify-content-center align-items-center"
        style={{
          height: "calc(100vh - 56px)",
        }}
      >
        <div>
          <Spinner
            animation="border"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          ></Spinner>
          <div>Aguarde, estamos carregando os melhores pratos para você!</div>
        </div>
      </div>
    );
  if (error) return <div>Failed to load menu: {error}</div>;
  if (!menu) return <div>No menu data available.</div>;

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
          <div
            className="main-content"
            style={{ backgroundColor: webSettings.backgroundColour }}
          >
            <SectionFilter
              onSectionSelect={setFilterSection}
              sections={menu.sections}
            />
            {menu.sections
              .filter(
                (section) =>
                  // If no section is selected, show all
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
                      background: webSettings.primaryColour,
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
                    color: webSettings.primaryColour,
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
              <div className="px-4 pb-4 mt-2">
                <Button
                  primarycolor={webSettings.primaryColour}
                  hovercolor={webSettings.primaryColourHover}
                  onClick={() => setOpenBasket(true)}
                >
                  Your Basket • {basketItems.length} item
                  {basketItems.length > 1 && "s"}
                </Button>
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
