/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    unoptimized: true,
    domains: ["dash-tail.vercel.app"],
  },
};

export default nextConfig;
