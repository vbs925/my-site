/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.10.5.163'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '10.10.5.163',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
