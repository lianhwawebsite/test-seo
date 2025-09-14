/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.lianhwapharm.com",
  generateRobotsTxt: true,
  i18n: {
    locales: ["tw", "en"],
    defaultLocale: "tw",
  },
};
