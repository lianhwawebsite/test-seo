import "@/app/lib/globals.css";
import { inter, notoSansTC } from "@/app/lib/fonts";
import Navbar from "@/app/component/Navbar";
import Footer from "./component/Footer";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/images/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: "Medicines Factory",
    locale: "zh_TW",
    images: ["/images/1200x630.svg"],
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
