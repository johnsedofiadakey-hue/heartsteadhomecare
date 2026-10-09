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
    return [{ source: "/:path*", has: [{ type: "host", value: "(?<host>.*\\.hosted\\.app)" }], destination: `https://${CUSTOM_DOMAIN}/:path*`, permanent: true }];
  },
};

export default nextConfig;
