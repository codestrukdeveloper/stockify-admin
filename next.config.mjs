/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'd4shqic59jnei.cloudfront.net',
        },
      ],
    },
  };
  
  export default nextConfig;
  