/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config.js')

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  env: {
    PORTAL_URL: process.env.PORTAL_URL,
    IS_DEV: process.env.IS_DEV === 'true'
  },
  i18n
}

module.exports = nextConfig
