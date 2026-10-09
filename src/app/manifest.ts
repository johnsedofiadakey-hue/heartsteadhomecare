import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Heartstead Home Care",
    short_name: "Heartstead",
    description: "Compassionate live-in and hourly home care in Skillman, New Jersey.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF6EA",
    theme_color: "#4A1E02",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
