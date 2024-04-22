/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [750, 828, 1080, 1200, 1920],
    imageSizes: [32, 64, 128, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [ {
      protocol: 'https',
      hostname: 'backend.desingbuero.de',
      pathname: '/**',
    },],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

module.exports = nextConfig


/**const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
 }) module.exports = withBundleAnalyzer({})**/
