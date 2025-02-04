//src/app/login/page.tsx
"use client";
import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useRestaurantContext } from "../layout";
import Button from "@/components/Button";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const { restaurant } = useRestaurantContext();

  if (!restaurant) return <div>No data</div>;

  const { webSettings } = restaurant;

  return (
    <div className="container p-5 bg-light">
      <div className="text-center" style={{ color: webSettings.primaryColour }}>
        <div className="text-center fw-bold fs-3">Bem vindo</div>
        <div className="text-center fw-light fs-6 mb-2">
          Preencha para continuar
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-12">
          <label className="form-label small">Seu email</label>
          <input
            className="form-control"
            style={{ height: "50px" }}
            placeholder="Email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={""}
            onChange={() => setInvalidLogin(false)}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-12 mt-2">
          <label className="form-label small">Senha</label>
          <InputGroup>
            <input
              className="form-control"
              style={{ height: "50px" }}
              placeholder="Senha"
              name="senha"
              type={isPasswordVisible ? "text" : "password"}
              autoComplete="current-password"
              defaultValue={""}
              onChange={() => setInvalidLogin(false)}
            />
            <InputGroup.Text
              style={{ backgroundColor: "white", cursor: "pointer" }}
            >
              {" "}
              {isPasswordVisible ? (
                <BsEyeSlashFill
                  size={20}
                  color="gray"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <BsEyeFill
                  size={20}
                  color="gray"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-12 mt-3">
          <Button
            primaryColor={webSettings.primaryColour}
            hoverColor={webSettings.primaryColourHover}
            onClick={() => setInvalidLogin(true)}
          >
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-3">Entrar</div>
            </div>
          </Button>{" "}
          {invalidLogin && (
            <div className="text-danger small">Email ou senha inválidos</div>
          )}
        </div>
      </div>
    </div>
  );
}
