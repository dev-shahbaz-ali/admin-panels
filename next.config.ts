import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // This is often used in CI/CD environments where type checking is done as a separate step.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
