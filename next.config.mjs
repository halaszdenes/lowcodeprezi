/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Dev-server safety after the 2026-09-16 OOM crash: a stale on-disk
    // Turbopack cache from May (349 MB) was reloaded at startup while the
    // machine was already under memory pressure. This deck is tiny, so a
    // cold compile costs seconds; skip the persistent dev cache entirely and
    // cap Turbopack's in-memory cache.
    turbopackFileSystemCacheForDev: false,
    turbopackMemoryLimit: 3 * 1024 * 1024 * 1024, // 3 GB, in bytes
  },
};

export default nextConfig;
