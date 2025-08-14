import "@/app/lib/globals.css";
import { inter, notoSansTC } from "@/app/lib/fonts";
import Navbar from "@/app/component/Navbar";
import Footer from "./component/Footer";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/images/favicon.ico" },
  title: "首頁｜某某製藥廠",
  description: "我們是某某製藥廠。歡迎來到我們的網站！",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "某某製藥廠",
    locale: "zh_TW",
    url: "/",
    images: ["/images/OG_image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.variable}  ${notoSansTC.variable}  antialiased font-sans`}>
        <div className="relative items-center justify-items-center flex flex-col min-h-screen">
          <Navbar />

          <main className="relative w-full flex flex-col grow">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
