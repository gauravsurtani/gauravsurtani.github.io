/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gaurav-portfolio-2025',
  assetPrefix: '/gaurav-portfolio-2025',
  images: {
    unoptimized: true,
  },
  // If you have other configurations, they should be preserved or added here.
  // For example, if you had a 'reactStrictMode: true' it should remain.
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 