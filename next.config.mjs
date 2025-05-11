/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
    images: {
        domains: ['drive.google.com'], // Allow Google Drive images
      },
};

export default bundleAnalyzer(nextConfig);

