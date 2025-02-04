import styled from "styled-components";

interface BotaoProps {
  bgColor: string;
  width: string;
  height: string;
  hoverColor: string;
  color?: string;
}

const ButtonCircle = styled.button<BotaoProps>`
  background-color: ${({ bgColor }) => bgColor || "#007bff"};
  width: ${({ width }) => width || "50px"};
  height: ${({ height }) => height || "50px"};
  color: ${({ color }) => color || "#fff"};
  border-radius: 50%;
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#0056b3"};
  }
`;

export default ButtonCircle;
