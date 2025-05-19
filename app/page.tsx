import Image from "next/image";
import Head from "next/head";

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Test Studio",
  url: "https://test-seo-beta.vercel.app",
  logo: "https://你的網站.com/logo.png",
  sameAs: ["https://www.instagram.com/你的帳號", "https://www.facebook.com/你的粉專"],
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>品牌設計與創意網站</title>
        <meta name="description" content="我們是 Test Studio，致力於打造兼具設計與功能的品牌網站。" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>歡迎來到 Test Studio</h1>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
