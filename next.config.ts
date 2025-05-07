import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Supprimez la directive 'browsing-topics' de Permissions-Policy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), camera=(), gyroscope=(), interest-cohort=()'
          }
        ]
      }
    ];
  }
};

export default nextConfig;