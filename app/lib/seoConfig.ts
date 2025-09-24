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
      description: "聯華製藥廠股份有限公司創立於1973年，專注於動物藥品的研發與製造。",
      alternates: { canonical: "/" },
      openGraph: {
        type: "website",
        siteName: "聯華製藥廠官方網站",
        locale: "zh_TW",
        url: "/",
        images: ["/images/OG_image.png"],
      },
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "聯華製藥廠官方網站",
          url: abs("/"),
          logo: abs("/images/favicon.ico"),
        },
      ],
    },
    products: {
      title: "產品一覽｜聯華製藥廠",
      description: "目前聯華的產品線涵蓋各類動物專用藥品，包括：注射液、懸浮液劑、乾粉注射劑、乾粉懸劑、散劑、口服液劑、外用消毒劑、含藥飼料添加物、補助飼料等，共計百種常用處方及指示用藥。",
      alternates: { canonical: "/products" },
      openGraph: {
        type: "website",
        siteName: "聯華製藥廠官方網站",
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
        siteName: "聯華製藥廠官方網站",
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
          name: "聯華製藥廠官方網站",
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