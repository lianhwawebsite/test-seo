import { abs } from "@/app/config";

type MetaInfo = {
  title: string;
  description: string;
  schema?: object | object[];
  openGraph?: {
    url?: string;
    type?: "website" | "article" | "product";
    siteName?: string;
    locale?: string;
    images?: string[];
  };
  alternates?: {
    canonical?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
};

export const seoMeta: Record<string, Record<string, MetaInfo>> = {
  "zh-TW": {
    home: {
      title: "首頁｜聯華製藥廠",
      description: "我們是聯華製藥廠。歡迎來到我們的網站！",
      alternates: { canonical: "/" },
      openGraph: {
        type: "website",
        siteName: "聯華製藥廠",
        locale: "zh_TW",
        url: "/", // 讓 metadataBase 自動補完整網域
        images: ["/images/OG_image.png"],
      },
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "聯華製藥廠",
          url: abs("/"),
          logo: abs("/images/favicon.ico"),
        },
      ],
    },
    products: {
      title: "產品一覽｜聯華製藥廠",
      description: "聯華製藥廠的所有產品。",
      alternates: { canonical: "/products" },
      openGraph: {
        type: "website",
        siteName: "聯華製藥廠",
        locale: "zh_TW",
        url: "/products",
        images: ["/images/OG_image.png"],
      },
      schema: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "產品一覽", item: abs("/products") },
        ],
      },
    },
    contact: {
      title: "聯絡我們｜聯華製藥廠",
      description: "歡迎與我們聯絡！如果您有任何問題或建議，請隨時與我們聯繫。",
      alternates: { canonical: "/contact" },
      openGraph: {
        type: "website",
        siteName: "聯華製藥廠",
        locale: "zh_TW",
        url: "/contact",
        images: ["/images/OG_image.png"],
      },
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "聯絡我們",
          url: abs("/contact"),
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "聯華製藥廠",
          url: abs("/"),
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "07-6963001",
              contactType: "customer service",
              areaServed: "TW",
              availableLanguage: ["Chinese"],
            },
          ],
        },
      ],
    },
  },
};