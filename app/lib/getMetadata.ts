import { seoMeta } from "./seoConfig";
import { Metadata } from "next";

export function getMetadata(lang: string, pageKey: string): Metadata {
  const meta = seoMeta[lang]?.[pageKey];
  return meta
    ? {
        title: meta.title,
        description: meta.description,
        icons: {
          icon: "/images/favicon.ico",
        },
      }
    : {
        title: "Test Studio",
        description: "網站設計與品牌創意。",
        icons: {
          icon: "/images/favicon.ico",
        },
      };
}

export function getSchema(key: string): object | null {
  return seoMeta[key]?.schema ?? null;
}