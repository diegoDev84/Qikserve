// src/components/SectionFilter.tsx
import { MenuSection } from "@/hooks/useFetchMenu";
import React from "react";

interface SectionFilterProps {
  onSectionSelect?: (section: string) => void;
  sections: MenuSection[];
}

export default function SectionFilter({
  onSectionSelect,
  sections,
}: SectionFilterProps) {
  console.log(sections);
  return (
    <div className="row">
      {sections.map((section) => (
        <div
          key={section.name}
          className="col-2 text-center d-flex flex-column align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => onSectionSelect && onSectionSelect(section.name)}
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
          <div className="text-center mt-3 mb-5 item-title">{section.name}</div>
        </div>
      ))}
    </div>
  );
}
