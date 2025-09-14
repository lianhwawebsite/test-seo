/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lianhwapharm.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true, // 自動產生 robots.txt
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  // 讓首頁權重/頻率不同
  transform: async (config, url) => ({
    loc: url,
    changefreq: url === `${siteUrl}/` ? "daily" : "weekly",
    priority: url === `${siteUrl}/` ? 1.0 : 0.7,
    lastmod: new Date().toISOString(),
  }),
  // 🔑 把動態產品頁一起加進 sitemap
  additionalPaths: async (config) => {
    const data = require("./data.json"); // 依你的專案路徑調整
    const products = data.products ?? [];
    return products.map((p) => ({
      loc: `${siteUrl}/products/${p.id}`,
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
  exclude: ["/api/*", "/drafts/*"], // 視需要排除
};
