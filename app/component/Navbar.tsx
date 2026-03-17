"use client";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import data from "@/data.json";
import enData from "@/enData.json";
import { AllData } from "@/app/lib/types";

export default function Navbar() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const currentData = isEn ? enData : data;
  const currentLangLabel = isEn ? "EN" : "繁";

  const getZhHref = () => {
    const pathSegments = pathname.split("/").filter((p) => p);

    if (isEn) {
      const newSegments = pathSegments.slice(1);
      return newSegments.length ? `/${newSegments.join("/")}` : "/";
    }

    return pathname || "/";
  };

  const getEnHref = () => {
    const pathSegments = pathname.split("/").filter((p) => p);

    if (isEn) {
      return pathname || "/en";
    }

    return `/${["en", ...pathSegments].join("/")}`;
  };

  const zhHref = getZhHref();
  const enHref = getEnHref();

  return (
    <>
      <DesktopNavbar currentData={currentData} currentLangLabel={currentLangLabel} zhHref={zhHref} enHref={enHref} isEn={isEn} />
      <MobileNavbar currentData={currentData} currentLangLabel={currentLangLabel} zhHref={zhHref} enHref={enHref} isEn={isEn} />
    </>
  );
}

function DesktopNavbar({ currentData, currentLangLabel, zhHref, enHref, isEn }: { currentData: AllData; currentLangLabel: string; zhHref: string; enHref: string; isEn: boolean }) {
  const homeItem = currentData.navbarItems[0];
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full hidden sm:flex bg-primary px-9 py-4 lg:px-24 md:py-8 text-white">
      <nav className="hidden mx-auto max-w-[1200px] sm:flex items-center justify-between w-full">
        <Link className="w-full" href={homeItem?.href || ""}>
          {isEn ? <Image src="/images/logo_pc_en.svg" alt="" width={214} height={60} className="w-1/2 lg:w-fit" /> : <Image src="/images/logo_pc.svg" alt="" width={214} height={60} className="w-1/2 lg:w-fit" />}
        </Link>
        <ul className="hidden w-full justify-end space-x-5 sm:flex lg:space-x-[30px]">
          {currentData.navbarItems.map((item) => {
            const homePaths = ["/", "/en"];
            const isHomePage = homePaths.includes(item.href || "");
            return (
              <Fragment key={item.label}>
                {!isHomePage && (
                  <li className="relative group text-base font-medium md:leading-[1.22] md:tracking-[.6px] md:font-bold">
                    <Link href={item.href!} className="">
                      {item.label}
                    </Link>
                  </li>
                )}
              </Fragment>
            );
          })}
          <li className="relative flex text-sm gap-8.25 ml-2">
            {isEn ? (
              <>
                <Link href={zhHref} className="relative">
                  <span className="absolute left-1/2 -top-[30%] -translate-x-1/2 py-3.75 px-3.75 border rounded-full border-white"></span>
                  <span>繁</span>
                </Link>
                <div className="relative">
                  <span className="absolute left-1/2 -top-[30%] -translate-x-1/2 py-3.75 px-3.75 border rounded-full border-white bg-white/30"></span>
                  <span>EN</span>
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <span className="absolute left-1/2 -top-[30%] -translate-x-1/2 py-3.75 px-3.75 border rounded-full border-white bg-white/30"></span>
                  <span>繁</span>
                </div>
                <Link href={enHref} className="relative">
                  <span className="absolute left-1/2 -top-[30%] -translate-x-1/2 py-3.75 px-3.75 border rounded-full border-white"></span>
                  <span>EN</span>
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

function MobileNavbar({ currentData, currentLangLabel, zhHref, enHref, isEn }: { currentData: AllData; currentLangLabel: string; zhHref: string; enHref: string; isEn: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const homeItem = currentData.navbarItems[0];

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="relative bg-primary py-4 px-8 flex justify-between w-full sm:hidden">
        {mobileOpen ? (
          <Link href={homeItem?.href || ""} onClick={() => setMobileOpen(false)}>
            <Image src="/images/logo_mo.svg" alt="" height={0} width={0} className="w-[49px] h-auto z-30 relative" />
          </Link>
        ) : (
          <Link href={homeItem?.href || ""}>
            <Image src="/images/logo_mo.svg" alt="" height={0} width={0} className="w-[49px] h-auto" />
          </Link>
        )}
        <div className="absolute top-[35%] right-[85px] w-fit flex justify-between gap-8 text-white text-sm">
          
          {isEn ? (
            <>
              <Link href={zhHref} className="relative">
                <span className="absolute left-1/2 -top-[25%] -translate-x-1/2 py-3.5 px-3.5 border rounded-full border-white"></span>
                <span>繁</span>
              </Link>
              <div className="relative">
                <span className="absolute left-1/2 -top-[25%] -translate-x-1/2 py-3.5 px-3.5 border rounded-full border-white"></span>
                <span>EN</span>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <span className="absolute left-1/2 -top-[25%] -translate-x-1/2 py-3.5 px-3.5 border rounded-full border-white"></span>
                <span>繁</span>
              </div>
              <Link href={enHref} className="relative">
                <span className="absolute left-1/2 -top-[25%] -translate-x-1/2 py-3.5 px-3.5 border rounded-full border-white"></span>
                <span>EN</span>
              </Link>
            </>
          )}
        </div>
        <button className="sm:hidden my-auto h-fit z-30 right-10" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <Image src="/images/close.svg" alt="" width={20} height={20} className="w-fit" /> : <Image src="/images/hamburger.svg" alt="" width={24} height={24} className="w-fit" />}
        </button>

        {mobileOpen && (
          <nav className="fixed top-0 right-0 z-20 md:hidden px-8 pb-4 w-[100%] h-screen pt-36 bg-primary text-white overflow-hidden">
            <ul className="space-y-10 w-full text-base leading-[1.26] tracking-[0.4%]">
              {currentData.navbarItems.map((item) => {
                const homePaths = ["/", "/en"];
                const isHomePage = homePaths.includes(item.href || "");

                return (
                  <Fragment key={item.label}>
                    {!isHomePage && (
                      <li>
                        <Link href={item.href!} className="flex items-center justify-between" onClick={() => setMobileOpen(false)}>
                          <p>{item.label}</p>
                        </Link>
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
