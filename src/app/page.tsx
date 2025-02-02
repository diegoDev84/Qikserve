// app/page.tsx
"use client";
import React, { useState } from "react";
import { useFetchMenu } from "../hooks/useFetchMenu";
import MenuItemComponent from "../components/MenuItem";
import SearchBar from "@/components/SearchBar";
import { Spinner } from "react-bootstrap";
import { normalizedText } from "@/functions/normalizedText";
import SectionFilter from "@/components/SectionFilter";

const HomePage: React.FC = () => {
  const { menu, loading, error } = useFetchMenu();
  const [filterQuery, setFilterQuery] = useState("");
  const [filterSection, setFilterSection] = useState("");

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
              sections={menu.sections.map((section) => section)}
            />
            {menu.sections.map(
              (section) =>
                //filtrando as seções com base na query, se algum item da seção passar no filtro, ela é renderizada
                section.items.some((item) =>
                  normalizedText(item.name).includes(
                    normalizedText(filterQuery)
                  )
                ) && (
                  <div key={section.id} className="mb-5">
                    <h2>{section.name}</h2>
                    {section.items.map(
                      (item) =>
                        //filtrando os itens com base na query
                        normalizedText(item.name).includes(
                          normalizedText(filterQuery)
                        ) && (
                          <MenuItemComponent
                            key={item.id.toString()}
                            item={{
                              ...item,
                              id: item.id.toString(),
                              description: item.description ?? "",
                            }}
                            onClick={() => {}}
                          />
                        )
                    )}
                  </div>
                )
            )}
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
