"use client";
import Link from "next/link";
import data from "@/data.json";
import { useState } from "react";

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

function DesktopNavbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="hidden sm:flex items-center justify-between px-10">
      <h1>M</h1>
      <nav className="">
        <ul className="hidden sm:flex space-x-6 px-6">
          {data.navbarItems.map((item) => (
            <li key={item.label} className="relative group" onMouseEnter={() => setOpenMenu(item.label)} onMouseLeave={() => setOpenMenu(null)}>
              {item.subItems ? (
                <span className="cursor-pointer group-hover:border-b transition">{item.label}</span>
              ) : (
                <Link href={item.href!} className="group-hover:border-b transition">
                  {item.label}
                </Link>
              )}
              <div className="absolute left-0 top-full w-full h-4 group-hover:block hidden"></div>
              {item.subItems && openMenu === item.label && (
                <div className="absolute left-0 top-[calc(100%+0.05rem)]  mt-2 bg-white border rounded shadow-lg z-50 group-hover:block">
                  <ul className="w-48">
                    {item.subItems.map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} className="block px-4 py-2 hover:bg-stone-100" onClick={() => setOpenMenu(null)}>
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
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

  return (
    <>
      <header className="fixed bg-white h-16 top-0 w-full sm:hidden ">
        <h1 className="absolute z-10 top-5 left-10">M</h1>
        <button className="sm:hidden absolute z-30 top-5 right-10" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <div>&#10005;</div> : <div>&#9776;</div>}
        </button>
        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="fixed top-0 right-0 z-20 md:hidden px-10 pb-4 w-[100%] h-screen pt-20 bg-white">
            <ul className="space-y-4">
              {data.navbarItems.map((item) => (
                <li key={item.label}>
                  {item.subItems ? (
                    <>
                      <div onClick={() => toggleItem(item.label)} className="cursor-pointer flex justify-between items-center">
                        {item.label}
                        {expandedItem === item.label ? <span>&#8896;</span> : <span>&#8897;</span>}
                      </div>
                      {expandedItem === item.label && (
                        <ul className="pl-4 mt-4 space-y-1">
                          {item.subItems.map((sub) => (
                            <li key={sub.href}>
                              <Link href={sub.href} className="block py-1 text-sm text-gray-700" onClick={() => setMobileOpen(false)}>
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href!} className="block py-1" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </Link>
                  )}
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
