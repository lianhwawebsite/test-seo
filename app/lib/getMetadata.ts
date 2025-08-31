import { seoMeta } from "./seoConfig";
import type { Metadata } from "next";

export function getMetadata(lang: string, pageKey: string): Metadata {
  const meta = seoMeta[lang]?.[pageKey];

  if (meta) {
    return {
      title: meta.title,
      description: meta.description,
      alternates: meta.alternates,
      robots: meta.robots ?? { index: true, follow: true },
      openGraph: meta.openGraph,
      icons: { icon: "/images/favicon.ico" },
    };
  }

  // fallback
  return {
    title: "聯華製藥廠",
    description: "聯華製藥廠股份有限公司創立於1973年，專注於動物藥品的研發與製造。",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: "聯華製藥廠",
      locale: "zh_TW",
      url: "/",
      images: ["/images/OG_image.png"],
    },
    icons: { icon: "/images/favicon.ico" },
  };
}

export function getSchema(key: string): object | object[] | null {
  return seoMeta["zh-TW"]?.[key]?.schema ?? null;
}