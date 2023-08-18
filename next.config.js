/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com", protocol: "https", port: "" },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  javascript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
