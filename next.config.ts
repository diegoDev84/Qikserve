// next.config.ts
import type { NextConfig } from "next";

const menuApiUrl =
  process.env.MENU_API_URL || "https://cdn-dev.preoday.com/challenge/menu";
const restaurantApiUrl =
  process.env.RESTAURANT_API_URL ||
  "https://cdn-dev.preoday.com/challenge/venue/9";

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
