import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import { AllServices } from "./component/home/AllServices";
import Script from "next/script";
import { abs } from "@/app/config";

export function generateMetadata() {
  return getMetadata("zh-TW", "home");
}

export default function Home() {
  const schema = getSchema("home");
  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <AllServices />
      <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: abs("/"),
          name: "聯華製藥廠官方網站",
          alternateName: "Lianhwa Pharm",
          inLanguage: "zh-TW",
        })}
      </Script>
    </>
  );
}