import type { NextConfig } from "next";

const nextConfig: NextConfig = {
env: {
    OPENWEATHERMAP_KEY: process.env.OPENWEATHERMAP_KEY,
    API_NINJAS_KEY: process.env.API_NINJAS_KEY,
  },
};

export default nextConfig;
