// src/components/CategoryFilter.tsx
import React from "react";

interface CategoryFilterProps {
  onCategorySelect?: (category: string) => void;
}

export default function CategoryFilter({
  onCategorySelect,
}: CategoryFilterProps) {
  const categories = ["Entradas", "Pratos Principais", "Sobremesas"];

  return (
    <div>
      <h2>Filtrar por categoria:</h2>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onCategorySelect?.(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
