/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    unoptimized: true,
    domains: ['secure.gravatar.com','data.ultrahumano.com'],
},
}

module.exports = nextConfig
