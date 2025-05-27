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
          {/* <header className="flex items-center justify-between px-10">
            <h1>Medicines Factory</h1> */}
            <Navbar />
          {/* </header> */}

          <main className="w-full h-fit mx-auto my-10 px-10 flex flex-col justify-start">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
