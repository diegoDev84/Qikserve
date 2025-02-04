import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Basket from "../../components/Basket";
import { useSelector, useDispatch } from "react-redux";
import { useRestaurantContext } from "@/app/layout";
import { useDeviceType } from "@/hooks/useDeviceType";
import "@testing-library/jest-dom";

// Mock react-redux hooks
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock restaurant context
jest.mock("@/app/layout", () => ({
  useRestaurantContext: jest.fn(),
}));

// Mock device type hook
jest.mock("@/hooks/useDeviceType", () => ({
  useDeviceType: jest.fn(),
}));

// Mock child components
jest.mock("../../components/CheckoutButton", () => {
  return function MockCheckoutButton() {
    return <div>CheckoutButton</div>;
  };
});

jest.mock("../../components/ButtonCircle", () => {
  return function MockButtonCircle(props: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
  }) {
    return <button onClick={props.onClick}>{props.children}</button>;
  };
});

// Mock basketSlice actions
jest.mock("@/store/slices/basketSlice", () => ({
  addItem: (item: {
    id: number;
    name: string;
    quantity: number;
    detail: string;
    price: number;
  }) => ({
    type: "basket/addItem",
    payload: item,
  }),
  removeItem: (item: { id: number; quantity: number }) => ({
    type: "basket/removeItem",
    payload: item,
  }),
}));

describe("Basket component", () => {
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

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useRestaurantContext as jest.Mock).mockReturnValue({
      restaurant: defaultRestaurant,
    });
    (useDeviceType as jest.Mock).mockReturnValue(false); // desktop by default
    mockDispatch.mockClear();
  });

  it("renders 'No data' when restaurant is null", () => {
    (useRestaurantContext as jest.Mock).mockReturnValue({ restaurant: null });
    (useSelector as unknown as jest.Mock).mockReturnValue([]);

    render(<Basket />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("renders empty basket message when there are no items", () => {
    (useRestaurantContext as jest.Mock).mockReturnValue({
      restaurant: defaultRestaurant,
    });
    (useSelector as unknown as jest.Mock).mockReturnValue([]);

    render(<Basket />);
    expect(screen.getByText("Seu carrinho está vazio.")).toBeInTheDocument();
  });

  it("renders basket items with details and total price", () => {
    const basketItems = [
      {
        id: 1,
        name: "Test Item",
        quantity: 2,
        detail: "Extra sauce",
        price: 20,
      },
    ];
    (useSelector as unknown as jest.Mock).mockReturnValue(basketItems);

    render(<Basket />);

    // Verify item name and details
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Extra sauce")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    // Verify price formatting
    const formattedPrice = (20).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    expect(screen.getAllByText(formattedPrice)[0]).toBeInTheDocument();

    // Verify CheckoutButton is rendered
    expect(screen.getByText("CheckoutButton")).toBeInTheDocument();
  });

  it("dispatches addItem when plus button is clicked", () => {
    const basketItems = [
      { id: 1, name: "Test Item", quantity: 2, detail: "", price: 20 },
    ];
    (useSelector as unknown as jest.Mock).mockReturnValue(basketItems);

    render(<Basket />);

    // Obtém todos os botões renderizados na tela
    const buttons = screen.getAllByRole("button");

    // O botão "+" é o último botão na linha do item
    const plusButton = buttons[buttons.length - 1];
    fireEvent.click(plusButton);

    expect(mockDispatch).toHaveBeenCalled();
    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction.type).toBe("basket/addItem");
    expect(dispatchedAction.payload.id).toBe(1);
    expect(dispatchedAction.payload.quantity).toBe(1);
  });

  it("dispatches removeItem when minus button is clicked", () => {
    const basketItems = [
      { id: 1, name: "Test Item", quantity: 2, detail: "", price: 20 },
    ];
    (useSelector as unknown as jest.Mock).mockReturnValue(basketItems);

    render(<Basket />);

    // Obtém todos os botões renderizados na tela
    const buttons = screen.getAllByRole("button");

    // O botão "-" é o primeiro botão na linha do item
    const minusButton = buttons[0];
    fireEvent.click(minusButton);

    expect(mockDispatch).toHaveBeenCalled();
    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction.type).toBe("basket/removeItem");
    expect(dispatchedAction.payload.id).toBe(1);
    expect(dispatchedAction.payload.quantity).toBe(1);
  });

  it("calls onClose callback when close icon is clicked on mobile", () => {
    // Set device type as mobile
    (useDeviceType as jest.Mock).mockReturnValue(true);
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
    const onClose = jest.fn();

    const { container } = render(<Basket onClose={onClose} />);
    // The close icon is rendered inside a div with class "position-absolute"
    const closeIcon = container.querySelector(".position-absolute");
    expect(closeIcon).toBeInTheDocument();
    if (closeIcon) {
      fireEvent.click(closeIcon);
    }
    expect(onClose).toHaveBeenCalled();
  });
});
