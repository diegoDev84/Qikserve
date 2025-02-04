import styled from "styled-components";

interface BotaoProps {
  primaryColor: string;
  hoverColor: string;
}

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
