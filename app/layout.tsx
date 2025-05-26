import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./component/Navbar";
import NextBreadcrumb from "@/app/component/NextBreadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <header className="flex items-center justify-between p-4">
            <Navbar />
          </header>

          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">{children}</main>

          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center w-full">
            <div className="w-full">
              <NextBreadcrumb homeElement={"Home"} separator={<span> &gt; </span>} activeClasses="text-stone-600" containerClasses="flex py-5" listClasses="text-stone-400 hover:underline mx-2" capitalizeLinks />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
