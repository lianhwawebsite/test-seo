"use client";
import Link from "next/link";
import data from "@/data.json";
import { Fragment, useState } from "react";
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
    <header className="relative w-full hidden sm:flex bg-primary px-16 py-2 text-white font-medium text-xl">
      <nav className="hidden sm:flex items-center justify-between w-full">
        <Link href={homeItem?.href || ""}>
          <div className="bg-stone-400 px-16"></div>
          <Image src="/images/logo_pc.svg" alt="" width={282} height={79} className="" />
        </Link>
        <ul className="hidden sm:flex space-x-15 px-6">
          {data.navbarItems.map((item) => {
            return (
              <Fragment key={item.label}>
                {item.href !== "/" && (
                  <li className="relative group">
                    <Link href={item.href!} className="group-hover:font-bold transition">
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const toggleItem = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };
  const homeItem = data.navbarItems.find((item) => item.label === "首頁");
  return (
    <>
      <header className="bg-stone-300 h-16 top-0 w-full sm:hidden ">
        <Link href={homeItem?.href || ""}>
          <div className="absolute px-16 z-10 top-5 left-6 md:left-10 bg-stone-400">&nbsp;</div>
        </Link>
        <button className="sm:hidden absolute z-30 top-5 right-10" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <div>&#10005;</div> : <div>&#9776;</div>}
        </button>
        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="fixed top-0 right-0 z-20 md:hidden px-10 pb-4 w-[100%] h-screen pt-20 bg-stone-300">
            <ul className="space-y-4">
              {data.navbarItems.map((item) => (
                <li key={item.label}>
                    <Link href={item.href!} className="block py-1" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </Link>
                  <div className="w-full mt-3 border-b"></div>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
