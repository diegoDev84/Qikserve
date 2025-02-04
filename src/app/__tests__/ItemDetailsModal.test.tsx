import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemDetailsModal from "../../components/ItemDetailsModal";
import { useRestaurantContext } from "@/app/layout";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useDispatch } from "react-redux";
import "@testing-library/jest-dom";

// Mock do Redux
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

// Mock do contexto do restaurante
jest.mock("@/app/layout", () => ({
  useRestaurantContext: jest.fn(),
}));

// Mock do hook para detectar o dispositivo
jest.mock("@/hooks/useDeviceType", () => ({
  useDeviceType: jest.fn(),
}));

// Mock de ações do Redux
jest.mock("@/store/slices/basketSlice", () => ({
  addItem: jest.fn(),
}));

describe("ItemDetailsModal Component", () => {
  const mockDispatch = jest.fn();
  const defaultRestaurant = {
    webSettings: {
      backgroundColour: "#fff",
      primaryColour: "#000",
      primaryColourHover: "#333",
    },
    locale: "en-US",
    ccy: "USD",
  };

  const testItem = {
    id: 1,
    name: "Test Item",
    price: 20,
    available: true,
    description: "Delicious test item",
    images: [{ id: 1, image: "test.jpg" }],
    modifiers: [
      {
        id: 1,
        name: "Extras",
        maxChoices: 1,
        minChoices: 1,
        items: [
          {
            id: 101,
            name: "Extra Cheese",
            price: 5,
            available: true,
            maxChoices: 1,
            position: 0,
            visible: true,
          },
          {
            id: 102,
            name: "Bacon",
            price: 3,
            available: true,
            maxChoices: 1,
            position: 1,
            visible: true,
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useRestaurantContext as jest.Mock).mockReturnValue({
      restaurant: defaultRestaurant,
    });
    (useDeviceType as jest.Mock).mockReturnValue(false); // Assume desktop por padrão
    mockDispatch.mockClear();
    jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock de alert
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("não renderiza quando `isOpen` for `false`", () => {
    render(
      <ItemDetailsModal isOpen={false} onClose={jest.fn()} item={testItem} />
    );
    expect(screen.queryByText("Test Item")).not.toBeInTheDocument();
  });

  it("exibe 'No data' quando o restaurante não está definido", () => {
    (useRestaurantContext as jest.Mock).mockReturnValue({ restaurant: null });

    render(
      <ItemDetailsModal isOpen={true} onClose={jest.fn()} item={testItem} />
    );
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("renderiza corretamente os detalhes do item", () => {
    render(
      <ItemDetailsModal isOpen={true} onClose={jest.fn()} item={testItem} />
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Delicious test item")).toBeInTheDocument();
    expect(screen.getByText("Extra Cheese")).toBeInTheDocument();
    expect(screen.getByText("Bacon")).toBeInTheDocument();
  });

  it("aumenta e diminui a quantidade do item corretamente", () => {
    render(
      <ItemDetailsModal isOpen={true} onClose={jest.fn()} item={testItem} />
    );

    const plusButton = screen.getAllByRole("button")[1];
    const minusButton = screen.getAllByRole("button")[0];
    const quantityDisplay = screen.getByText("1");

    fireEvent.click(plusButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(minusButton);
    expect(quantityDisplay).toHaveTextContent("1");
  });

  it("exibe alerta se um modificador obrigatório não for selecionado", () => {
    render(
      <ItemDetailsModal isOpen={true} onClose={jest.fn()} item={testItem} />
    );

    const addToOrderButton = screen.getByText(/Add to Order/i);
    fireEvent.click(addToOrderButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Selecione pelo menos uma opção/complemento do item"
    );
  });

  it("fecha o modal ao clicar no botão de fechar", () => {
    const onCloseMock = jest.fn();
    render(
      <ItemDetailsModal isOpen={true} onClose={onCloseMock} item={testItem} />
    );

    const closeButton = screen.getByTitle("Fechar");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
