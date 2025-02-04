import styled from "styled-components";

interface BotaoProps {
  bgcolor?: string;
  hovercolor?: string;
  width: string;
  height: string;
  color?: string;
}

/**
 * A circular button component styled using styled-components.
 *
 * @component
 * @example
 * // Usage example:
 * <ButtonCircle
 *   bgcolor="#007bff"
 *   hovercolor="#0056b3"
 *   width="50px"
 *   height="50px"
 *   color="#fff"
 * />
 *
 * @param {Object} props - The properties for the component.
 * @param {string} [props.bgcolor] - Background color. Defaults to "#007bff".
 * @param {string} [props.width] - Width of the button. Defaults to "50px".
 * @param {string} [props.height] - Height of the button. Defaults to "50px".
 * @param {string} [props.color] - Text color. Defaults to "#fff".
 * @param {string} [props.hovercolor] - Background color on hover. Defaults to "#0056b3".
 *
 * @returns {JSX.Element} A styled circular button.
 */

const ButtonCircle = styled.button<BotaoProps>`
  background-color: ${(props) => props.bgcolor || "#007bff"};
  width: ${(props) => props.width || "50px"};
  height: ${(props) => props.height || "50px"};
  color: ${(props) => props.color || "#fff"};
  border-radius: 50%;
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hovercolor || "#0056b3"};
  }
`;

export default ButtonCircle;
