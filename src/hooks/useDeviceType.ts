"use client";
import { useEffect, useState } from "react";

export function useDeviceType() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 991); // Define como mobile se for menor que 991px
    };

    checkScreenSize(); // Chama a função no carregamento inicial
    window.addEventListener("resize", checkScreenSize); // Adiciona o evento de resize

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Remove o evento ao desmontar
    };
  }, []);

  return isMobile;
}
