import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@dk/database', '@dk/config'],
}

export default nextConfig
