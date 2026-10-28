/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['react-markdown', 'remark-gfm'],
};

module.exports = nextConfig;
