"use client"; // Adicione esta linha no topo do arquivo

import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

/**
 * A SearchBar component that provides an input field for searching menu items.
 *
 * This component maintains an internal state to track the user's query.
 * It calls the provided onSearch callback every time the user updates the input,
 * enabling the parent component to update its state accordingly.
 *
 * @param {Object} props - The properties for the SearchBar.
 * @param {function(string): void} props.onSearch - Callback function to be invoked with the updated search string.
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 */

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

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
