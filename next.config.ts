import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 1. Core Build Settings */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* 2. Security Headers (Required for Firebase Auth Popups) */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups', 
          },
        ],
      },
    ];
  },

  /* 3. Image Optimization */
  images: {
    unoptimized: true, // Required for static export (Firebase can't resize images on the fly)
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.googleapis.com', port: '', pathname: '/**' },
    ],
  },
};

export default nextConfig;