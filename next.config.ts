import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? "/CYEpreevent-UI" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath ? basePath : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
