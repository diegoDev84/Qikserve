// next.config.ts
import type { NextConfig } from "next";

// Verifica se está em ambiente de desenvolvimento
const isDev = process.env.NODE_ENV === "development";

// Em produção, usa as URLs absolutas diretamente
const menuApiUrl = isDev
  ? "http://localhost:3000/api/menu"
  : "https://cdn-dev.preoday.com/challenge/menu";

const restaurantApiUrl = isDev
  ? "http://localhost:3000/api/restaurant"
  : "https://cdn-dev.preoday.com/challenge/venue/9";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/menu",
        destination: menuApiUrl,
      },
      {
        source: "/api/restaurant",
        destination: restaurantApiUrl,
      },
    ];
  },
};

export default nextConfig;
