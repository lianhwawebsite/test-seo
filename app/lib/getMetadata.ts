import { seoMeta } from "./seoConfig";
import { Metadata } from "next";

export function getMetadata(lang: string, pageKey: string): Metadata {
  const meta = seoMeta[lang]?.[pageKey];
  return meta
    ? {
        title: meta.title,
        description: meta.description,
      }
    : {
        title: "Test Studio",
        description: "網站設計與品牌創意。",
      };
}

export function getSchema(key: string): object | null {
  return seoMeta[key]?.schema ?? null;
}