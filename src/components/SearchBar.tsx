"use client"; // Adicione esta linha no topo do arquivo

import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Atualiza o estado no HomePage
  };

  return (
    <InputGroup className="mb-3 mt-3">
      <InputGroup.Text style={{ backgroundColor: "white" }}>
        {" "}
        <BsSearch size={20} color="gray" />
      </InputGroup.Text>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Search menu items"
        value={query}
        style={{ borderLeft: "none" }}
        onChange={handleChange}
      />
    </InputGroup>
  );
}
