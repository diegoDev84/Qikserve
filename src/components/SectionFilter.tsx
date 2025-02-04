import { MenuSection } from "@/hooks/useFetchMenu";
import { useFetchRestaurant } from "@/hooks/useFetchRestaurant";
import React, { useState } from "react";

interface SectionFilterProps {
  onSectionSelect: (section: string) => void;
  sections: MenuSection[];
}

/**
 * Renders a set of sections for filtering with a horizontal scrollable list.
 *
 * The component displays each section as a clickable item with an image and title. When a section is clicked,
 * its selection is toggled. If the section is currently selected, it is deselected. The visual state is communicated
 * by applying a border to the selected section's container and image.
 *
 * If the restaurant context is not available, the component renders a fallback header indicating that there is no data.
 *
 * @param onSectionSelect - A callback function invoked when a section is selected or deselected.
 * @param sections - An array of section objects, where each section includes a name and an array of images.
 *
 * @returns A JSX element representing the section filter.
 *
 * @example
 * // Usage example:
 * <SectionFilter
 *   onSectionSelect={(selected) => console.log("Selected section:", selected)}
 *   sections={[
 *     { name: "Burgers", images: [{ image: "/path/to/burger.jpg" }] },
 *     { name: "Pizza", images: [{ image: "/path/to/pizza.jpg" }] }
 *   ]}
 * />
 */

export default function SectionFilter({
  onSectionSelect,
  sections,
}: SectionFilterProps) {
  const [selectedSection, setSelectedSection] = useState<string>("");

  const handleSectionClick = (sectionName: string) => {
    const newSection = selectedSection === sectionName ? "" : sectionName; // Se já estiver selecionado, desmarca
    setSelectedSection(newSection);
    onSectionSelect(newSection);
  };

  const { restaurant } = useFetchRestaurant();

  if (!restaurant) return <header>No data</header>;

  const { webSettings } = restaurant;
  const borderColor = webSettings.primaryColour ?? "#121212";

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
