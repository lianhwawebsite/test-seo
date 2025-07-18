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
                  <li className="relative group text-base font-medium md:bottom-[5px] md:text-lg md:leading-[1.22] md:tracking-[.6px] md:font-bold">
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
      <header className="relative bg-primary py-4 px-8 top-0 w-full sm:hidden ">
        <Link href={homeItem?.href || ""}>
          <Image src="/images/logo_mo.svg" alt="" width={334} height={244} className="w-2/12" />
        </Link>
        <button className="sm:hidden absolute top-0 bottom-0 my-auto h-fit z-30 right-10" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <div className="text-white">&#10005;</div> : <Image src="/images/hamburger.svg" alt="" width={24} height={24} className="w-fit" />}
        </button>
        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="fixed top-0 right-0 z-20 md:hidden px-10 pb-4 w-[100%] h-screen pt-36 bg-primary text-white overflow-hidden">
            <ul className="pl-8 space-y-8 w-full text-lg">
              {data.navbarItems.map((item) => {
                return (
                  <Fragment key={item.label}>
                    {item.href === "/" ? null : (
                      <li>
                        <Link href={item.href!} className="w-fit" onClick={() => setMobileOpen(false)}>
                          {item.label}
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
