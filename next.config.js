const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'do-i-have-it-storage.s3.amazonaws.com',
      },
    ],
  },
};

const isProd = process.env.NODE_ENV === 'production';
process.env.NEXTAUTH_URL = isProd ? process.env.NEXTAUTH_URL : 'http://localhost:3000';

module.exports = nextConfig;
