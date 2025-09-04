import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ccmlpkfwtayqiqsyzvod.supabase.co',
      },
    ],
  },
  serverActions: {
    bodySizeLimit: 20 * 1024 * 1024,
  },
};

export default nextConfig;
