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
      // Remove the image preloading section if not needed
      // Add any additional webpack configuration if necessary
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
});
