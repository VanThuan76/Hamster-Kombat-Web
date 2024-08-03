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
    middleware: true,
  },
  transpilePackages: ["ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "hamster-admin.alphasius.com",
      },
    ],
  },
  webpack(config, options) {
    if (options.isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        const preloadImages = require("fs")
          .readdirSync("./public/project")
          .map((file) => `import './public/project/${file}';`)
          .join("\n");

        if (entries["main.js"]) {
          entries["main.js"].unshift(preloadImages);
        }

        return entries;
      };
    }
    return config;
  },
});
