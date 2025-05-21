type MetaInfo = {
  title: string;
  description: string;
  schema?: object;
};

export const seoMeta: Record<string, Record<string, MetaInfo>> = {
  "zh-TW": {
    home: {
      title: "Test Studio｜品牌設計與創意網站",
      description: "我們是 Test Studio，致力於打造兼具設計與功能的品牌網站。",
      schema: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Studio",
        url: "https://test-seo-beta.vercel.app",
        logo: "https://test-seo-beta.vercel.app/logo.png",
        sameAs: ["https://www.instagram.com/你的帳號", "https://www.facebook.com/你的粉專"],
      },
    },
    about: {
      title: "關於我們｜Test Studio",
      description: "Test Studio 是一間專注品牌設計與網站開發的創意團隊。",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Test Studio",
        url: "https://test-seo-beta.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://test-seo-beta.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    },
    products: {
      title: "產品介紹｜Test Studio",
      description: "產品介紹，Test Studio 的所有產品。",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Test Studio",
        url: "https://test-seo-beta.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://test-seo-beta.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    },
    contact: {
      title: "聯絡我們｜Test Studio",
      description: "歡迎與我們聯絡，Test Studio 將為您打造理想品牌。",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Test Studio",
        url: "https://test-seo-beta.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://test-seo-beta.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    },
  }
};
