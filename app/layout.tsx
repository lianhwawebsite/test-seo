import "@/app/lib/globals.css";
import { inter, notoSansTC } from "@/app/lib/fonts";
import Navbar from "@/app/component/Navbar";
import Footer from "./component/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.variable}  ${notoSansTC.variable}  antialiased font-sans`}>
        <div className="relative items-center justify-items-center min-h-screen">
          <Navbar />

          <main className="relative w-full h-fit flex flex-col justify-start">
              {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
