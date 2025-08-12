"use client";
import Link from "next/link";
import data from "@/data.json";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

function DesktopNavbar() {
  const homeItem = data.navbarItems.find((item) => item.label === "首頁");
  return (
    <header className="relative w-full hidden sm:flex bg-primary px-9 py-4 lg:px-24 md:py-8 text-white">
      <nav className="hidden mx-auto max-w-[1200px] sm:flex items-center justify-between w-full">
        <Link className="w-full" href={homeItem?.href || ""}>
          <Image src="/images/logo_pc.svg" alt="" width={214} height={60} className="w-1/2 lg:w-fit" />
        </Link>
        <ul className="hidden w-full justify-end space-x-5 sm:flex lg:space-x-[30px]">
          {data.navbarItems.map((item) => {
            return (
              <Fragment key={item.label}>
                {item.href !== "/" && (
                  <li className="relative group text-base font-medium md:text-lg md:leading-[1.22] md:tracking-[.6px] md:font-bold">
                    <Link href={item.href!} className="">
                      {item.label}
                    </Link>
                  </li>
                )}
              </Fragment>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

function MobileNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const homeItem = data.navbarItems.find((item) => item.label === "首頁");

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

        <button className="sm:hidden my-auto h-fit z-30 right-10" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <Image src="/images/close.svg" alt="" width={20} height={20} className="w-fit" /> : <Image src="/images/hamburger.svg" alt="" width={24} height={24} className="w-fit" />}
        </button>
        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="fixed top-0 right-0 z-20 md:hidden px-8 pb-4 w-[100%] h-screen pt-36 bg-primary text-white overflow-hidden">
            <ul className="space-y-10 w-full text-base leading-[1.26] tracking-[0.4%]">
              {data.navbarItems.map((item) => {
                return (
                  <Fragment key={item.label}>
                    {item.href === "/" ? null : (
                      <li className="">
                        <Link href={item.href!} className="flex items-center justify-between" onClick={() => setMobileOpen(false)}>
                          <p>{item.label}</p>
                          <Image src="/images/arrow_down_white.svg" alt="" width={20} height={20} className="w-fit" />
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
