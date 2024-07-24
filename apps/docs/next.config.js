const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["grammy"],
  },
  transpilePackages: ["ui"],
  webpack(config, options) {
    if (options.isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        const preloadImages = require('fs')
          .readdirSync('./public/project')
          .map(file => `import './public/project/${file}';`)
          .join('\n');

        if (entries['main.js']) {
          entries['main.js'].unshift(preloadImages);
        }

        return entries;
      };
    }
    return config;
  },
});