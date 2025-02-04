"use client";
import { useEffect, useState } from "react";

/**
 * Custom React hook that detects if the current device is mobile.
 *
 * This hook listens to window resize events and checks whether the window's
 * inner width is less than 991 pixels. It returns a boolean indicating if the device
 * is considered mobile.
 *
 * @returns {boolean | null} Returns true if the window width is less than 991 pixels,
 * false if it's not, or null if the device type has not been determined yet.
 *
 * @example
 * const isMobile = useDeviceType();
 * if (isMobile === null) {
 *   // ainda não determinou: renderize um fallback ou nada
 * } else if (isMobile) {
 *   // Execute mobile-specific logic here
 * }
 */
export function useDeviceType() {
  // Inicialmente, definimos como null para indicar que ainda não sabemos.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

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
