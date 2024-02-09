/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['do-i-have-it-storage.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
