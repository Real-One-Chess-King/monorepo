import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    GAME_SERVER_PORT: process.env.GAME_SERVER_PORT,
    GAME_SERVER_URL: process.env.GAME_SERVER_URL,
    USER_SERVER_PORT: process.env.USER_SERVER_PORT,
    USER_SERVER_URL: process.env.USER_SERVER_URL,
    FRONT_END_PORT: process.env.FRONT_END_PORT,
    FRONT_END_URL: process.env.FRONT_END_URL,
  },
};

export default nextConfig;
