const withImages = require("next-images");
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([withImages, withNextIntl, withBundleAnalyzer], {
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["grammy"],
    mdxRs: true,
  },
  transpilePackages: ["ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hamster-admin.alphasius.com",
      },
    ],
  },
  webpack(config, options) {
    if (options.isServer) {
    }
    return config;
  }
});
