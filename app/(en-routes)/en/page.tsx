import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import { AllServices } from "@/app/component/home/AllServices";
import Script from "next/script";
import { abs } from "@/app/config";
import data from "@/enData.json";

export function generateMetadata() {
  return getMetadata("en", "home");
}

export default function Home() {
  const schema = getSchema("en","home");
  const fetchData = data;
  
  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <AllServices allData={fetchData} />
      <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: abs("/en"),
          name: "Lian Hwa Pharmaceutical Official Website",
          alternateName: "Lian Hwa Pharmaceutical",
          inLanguage: "en",
        })}
      </Script>
    </>
  );
}