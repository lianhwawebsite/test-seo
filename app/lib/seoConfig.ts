type MetaInfo = {
  title: string;
  description: string;
  schema?: object;
};

export const seoMeta: Record<string, Record<string, MetaInfo>> = {
  "zh-TW": {
    home: {
      title: "Medicines Factory 網站",
      description: "我們是 Medicines Factory。歡迎來到我們的網站！",
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
      title: "關於我們｜Medicines Factory",
      description: "Medicines Factory 是一間藥廠，專注於提供高品質的藥品和服務。",
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
      title: "產品介紹｜Medicines Factory",
      description: "產品介紹，Medicines Factory 的所有產品。",
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
      title: "聯絡我們｜Medicines Factory",
      description: "歡迎與我們聯絡！如果您有任何問題或建議，請隨時與我們聯繫。",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Medicines Factory",
        url: "https://test-seo-beta.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://test-seo-beta.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    },
  },
};
