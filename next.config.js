/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'localhost', 'i.pravatar.cc'],
  },
}

module.exports = nextConfig


/**const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
 }) module.exports = withBundleAnalyzer({})**/
