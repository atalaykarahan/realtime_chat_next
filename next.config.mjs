/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    unoptimized: true,
    domains: ["dash-tail.vercel.app", "lh3.googleusercontent.com", "i.hizliresim.com"],
  },
};

export default nextConfig;
