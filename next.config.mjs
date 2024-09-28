/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["."]
  },
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["pino", "pino-pretty"]
  }
};

export default nextConfig;
