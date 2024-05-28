/** @type {import('next').NextConfig} */
// const nextConfig = require("@ducanh2912/next-pwa").default({
//     reactStrictMode: true,
//     swcMinify: true,
//     eslint: {
//         ignoreDuringBuilds: true,
//     },
//     env: {
//         AUTH_SECRET: process.env.AUTH_SECRET
//     },
// });

// module.exports = nextConfig;

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    // register: true,
    // scope: "/app",
    // sw: "service-worker.js",
    //...
  });

  module.exports = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET
    },
  });
