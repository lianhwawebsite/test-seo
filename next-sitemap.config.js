/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://test-seo-beta.vercel.app",
  generateRobotsTxt: true, // 同時生成 robots.txt
};
