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

module.exports = nextConfig;
