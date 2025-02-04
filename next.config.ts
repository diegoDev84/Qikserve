// next.config.ts
import type { NextConfig } from "next";

// Verifica se está em ambiente de desenvolvimento

const menuApiUrl = "https://cdn-dev.preoday.com/challenge/menu";
const restaurantApiUrl = "https://cdn-dev.preoday.com/challenge/venue/9";

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
