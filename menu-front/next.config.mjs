/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: '10.0.0.127',
              port: '8000',
              pathname: '/storage/**',
            },
        ],
    }
};

export default nextConfig;
