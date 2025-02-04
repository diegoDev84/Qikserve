import styled from "styled-components";

interface BotaoProps {
  primaryColor: string;
  hoverColor: string;
}

/**
 * Represents a styled button component.
 *
 * This component utilizes styled-components to render a customizable button element.
 * It accepts properties conforming to BotaoProps to dynamically set the background colors for default
 * and hover states.
 *
 * @remarks
 * - The background color of the button is set via the `primaryColor` prop.
 * - On hover, the background changes to the `hoverColor` prop.
 * - The component has a width of 100%, a fixed height, no border, a rounded appearance, and transition effects.
 *
 * @example
 * <Button primaryColor="#007BFF" hoverColor="#0056b3">
 *   Click Me!
 * </Button>
 *
 * @public
 */

const Button = styled.button<BotaoProps>`
  background-color: ${(props) => props.primaryColor};
  color: #fff;
  width: 100%;
  height: 48px;
  font-size: 18px;
  border: none;
  border-radius: 40px;
  letter-spacing: 0.75px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export default Button;
