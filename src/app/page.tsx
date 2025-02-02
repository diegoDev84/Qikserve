// app/page.tsx
"use client";
import React from "react";
import { useFetchMenu } from "../hooks/useFetchMenu";
import MenuItemComponent from "../components/MenuItem";
import SearchBar from "@/components/SearchBar";

const HomePage: React.FC = () => {
  const { menu, loading, error } = useFetchMenu();

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error}</div>;
  if (!menu) return <div>No menu available.</div>;

  return (
    <div className="container">
      <div className="row">
        <SearchBar />
      </div>
      <div className="row wrap-content">
        <div className="col-lg-8 col-sm-12">
          <div className="main-content">
            {menu.sections.map((section) => (
              <div key={section.id} className="mb-5">
                <h2>{section.name}</h2>
                {section.items.map((item) => (
                  <MenuItemComponent
                    key={item.id.toString()}
                    item={{
                      ...item,
                      id: item.id.toString(),
                      description: item.description ?? "",
                    }}
                    onClick={() => {}}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4 col-sm-12">
          <div className="desktop-basket">
            <div className="desktop-basket-header">
              <h2>Carrinho</h2>
            </div>
            <div className="desktop-bt-msg">Seu carrinho está vazio</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
