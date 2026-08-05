import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/1grow",
        destination: "https://1grow.in",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
