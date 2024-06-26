/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    disable: process.env.NODE_ENV === "development"
})

const nextConfig = withPWA({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: 'https',
                hostname: "avatars.githubusercontent.com",
            },
        ],
    }
})

module.exports = nextConfig