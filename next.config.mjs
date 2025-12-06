import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Required for Cloudflare Pages
    output: "standalone",

    // Optimize images for Edge runtime
    images: {
        unoptimized: true,
    },
};

// Setup Cloudflare bindings in development
if (process.env.NODE_ENV === "development") {
    await setupDevPlatform();
}

export default nextConfig;
