export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://test-seo-hazel.vercel.app";

export const abs = (path = "/") => new URL(path, SITE_URL).toString();