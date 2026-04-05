import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    '3000-iz3f4k6koeyzt4b2idtkr-dfc00ec5.sandbox.novita.ai',
    '3000-iz3f4k6koeyzt4b2idtkr-dfc00ec5.sandbox.gensparksite.com',
    '*.sandbox.novita.ai',
    '*.sandbox.gensparksite.com',
  ],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
