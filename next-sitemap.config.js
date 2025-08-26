/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://test-seo-hazel.vercel.app",
  generateRobotsTxt: true,
  i18n: {
    locales: ["tw", "en"],
    defaultLocale: "tw",
  },
};
