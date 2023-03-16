/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  env: {
    PORTAL_URL: process.env.PORTAL_URL
  }
}

module.exports = nextConfig
