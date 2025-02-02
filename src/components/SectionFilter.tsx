import { useRestaurantContext } from "@/app/layout";
import { MenuSection } from "@/hooks/useFetchMenu";
import React, { useState } from "react";

interface SectionFilterProps {
  onSectionSelect: (section: string) => void;
  sections: MenuSection[];
}

export default function SectionFilter({
  onSectionSelect,
  sections,
}: SectionFilterProps) {
  const [selectedSection, setSelectedSection] = useState("");

  const handleSectionClick = (sectionName: string) => {
    const newSection = selectedSection === sectionName ? "" : sectionName; // Se já estiver selecionado, desmarca
    setSelectedSection(newSection);
    onSectionSelect(newSection);
  };

  const { restaurant } = useRestaurantContext();

  if (!restaurant) return <header>No data</header>;

  const { webSettings } = restaurant;
  const borderColor = webSettings.navBackgroundColour ?? "#121212";

  return (
    <div
      className="section-filter"
      style={{
        display: "flex",
        gap: "12px",
        overflowX: "auto", // Permite rolagem horizontal se os itens ultrapassarem o espaço disponível
        padding: "10px 0",
      }}
    >
      {sections.map((section) => {
        const isActive = selectedSection === section.name;

        return (
          <div
            key={section.name}
            className="text-center d-flex flex-column align-items-center"
            style={{
              cursor: "pointer",
              borderBottom: isActive ? `3px solid ${borderColor}` : "none",
              width: "104px",
            }}
            onClick={() => handleSectionClick(section.name)}
          >
            <div
              style={{
                height: "83px",
                width: "83px",
                padding: "3px",
                borderRadius: "50px",
                border: isActive ? `3px solid ${borderColor}` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={section.images[0].image}
                alt={section.name}
                width={72}
                height={72}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              className="text-center mt-3 mb-3 item-title"
              style={{
                fontWeight: isActive ? "bold" : "normal",
                letterSpacing: "0.5px",
                color: "#121212",
              }}
            >
              {section.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
