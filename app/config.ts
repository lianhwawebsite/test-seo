export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lianhwapharm.com";

export const abs = (path = "/") => new URL(path, SITE_URL).toString();