import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ["tw", "en"], // URL 使用的路徑
    defaultLocale: "tw", // 你的預設網址
    localeDetection: false,
  },
};

export default nextConfig;
