/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    }
  },
  env: {
    API_URL: process.env.API_URL,
  },
}

module.exports = nextConfig
