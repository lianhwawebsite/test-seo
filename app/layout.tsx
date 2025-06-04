import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/component/Navbar";
import Footer from "./component/Footer";

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
        <div className="relative items-center justify-items-center min-h-screen py-8 sm:py-20">
          <Navbar />

          <main className="w-full h-fit my-6 mb-36 flex flex-col justify-start">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
