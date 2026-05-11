import type { NextConfig } from "next";

const nextConfig = {
  output: 'export', // Adicione esta linha
  images: {
    unoptimized: true, // Necessário para exportação estática
  },
};

export default nextConfig;
