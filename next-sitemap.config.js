/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lianhwapharm.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // 調整首頁與一般頁的權重／頻率
  transform: async (config, url) => ({
    loc: url,
    changefreq: url === `${siteUrl}/` ? "daily" : "weekly",
    priority: url === `${siteUrl}/` ? 1.0 : 0.7,
    lastmod: new Date().toISOString(),
  }),

  // 這裡同時加入「靜態主要頁」與「動態產品頁」
  additionalPaths: async (config) => {
    const list = [];

    // 1) 靜態主要頁（依你的實際路由調整）
    const staticPages = [
      "/", // 首頁
      "/products", // 產品總覽
      "/about",
      "/contact",
    ];
    for (const path of staticPages) {
      list.push({
        loc: `${siteUrl}${path}`,
        changefreq: path === "/" ? "daily" : "weekly",
        priority: path === "/" ? 1.0 : 0.7,
        lastmod: new Date().toISOString(),
      });
    }

    // 2) 動態產品頁（沿用你的 data.json / 實際來源）
    const data = require("./data.json");
    const products = data.products ?? [];
    for (const p of products) {
      if (!p?.id) continue; // 避免空值
      list.push({
        loc: `${siteUrl}/products/${p.id}`, // 若你用 slug，改成 p.slug
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }

    return list;
  },

  exclude: ["/api/*", "/drafts/*"], // 視需要排除
};
