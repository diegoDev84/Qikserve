"use client"; // Adicione esta linha no topo do arquivo

import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Lógica de busca
  //   alert(Buscando por: ${query});
  // };

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
        onChange={(e) => setQuery(e.target.value)}
      />
    </InputGroup>
  );
}
