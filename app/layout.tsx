import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./component/Navbar";
import { localeMap } from "@/app/lib/localeMap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const lang = localeMap["tw"] || "zh-TW";

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <header className="flex items-center justify-between p-4">
            <Navbar />
          </header>

          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">{children}</main>

          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">footer</footer>
        </div>
      </body>
    </html>
  );
}
