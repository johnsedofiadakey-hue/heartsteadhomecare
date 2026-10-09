import type { NextConfig } from "next";

const CUSTOM_DOMAIN = "heartsteadhomecarenj.com";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Send visitors on the temporary Firebase address to the real domain once its certificate is live.
    if (process.env.REDIRECT_TO_CUSTOM_DOMAIN !== "true") return [];
    // App Hosting passes the visitor's address in X-Forwarded-Host; Host is the internal service name.
    const hostedApp = ".*\\.hosted\\.app";
    return [
      { source: "/:path*", has: [{ type: "header", key: "x-forwarded-host", value: hostedApp }], destination: `https://${CUSTOM_DOMAIN}/:path*`, permanent: true },
      { source: "/:path*", has: [{ type: "host", value: hostedApp }], destination: `https://${CUSTOM_DOMAIN}/:path*`, permanent: true },
    ];
  },
};

export default nextConfig;
