/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  // Disable CSS optimization temporarily
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;