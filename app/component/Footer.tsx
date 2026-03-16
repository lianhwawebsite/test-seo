"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import data from "@/data.json";
import enData from "@/enData.json";

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const currentData = isEn ? enData : data;
  
  const isHome = pathname === "/" || "/en";
  const date = new Date();
  let year = date.getFullYear();
  const homeItem = currentData.footerItems.find((item) => item.name === "Home");
  const companyNameItem = currentData.footerItems.find((item) => item.name === "CompanyName");
  const companyEnglishNameItem = currentData.footerItems.find((item) => item.name === "CompanyAlterName");
  return (
    <footer
      className={`relative z-10 row-start-3 font-notoSansTC overflow-hidden flex items-center justify-center h-[205px] mt-auto md:h-[328px] w-screen md:px-9 lg:px-24 
      ${isHome ? "bg-transparent" : "bg-white"}`}>
      <Image src="/images/footer_pc.svg" alt="" fill sizes="(min-width: 768px) 100vw, 0px" className="object-top object-cover hidden md:block -z-10" priority />
      <Image src="/images/footer_mo.svg" alt="" fill sizes="(max-width: 767px) 100vw, 0px" className="object-top object-cover block md:hidden -z-10" priority />
      <div className="mx-auto max-w-[1200px] relative z-10 grid gap-6 h-fit w-full pt-9 pb-6 text-white md:grid-cols-3 md:pb-15 md:pt-25 lg:grid-cols-3">
        <div className="order-2 md:order-1 relative flex flex-col gap-13.5 items-center md:items-start md:col-span-2 lg:col-span-2 justify-start">
          <Link href={homeItem?.href || ""} className="hidden w-fit md:flex">
            <Image src="/images/logo_mo.svg" alt="" height={0} width={0} className="w-[135px] h-auto" priority />
          </Link>
          <p className="text-[8px] text-center md:text-xs md:leading-[1.16] md:tracking-0 md:text-left">
            {companyEnglishNameItem?.label}&nbsp;©&nbsp;{year}. All rights reserved.
          </p>
        </div>
        <div className="order-1 md:order-2 relative flex flex-col gap-3.5 md:gap-7 md:justify-start md:items-start md:col-span-1 lg:col-span-1">
          <p className="footer-title">{companyNameItem?.label}</p>
          <div className="w-full flex flex-col justify-start items-center gap-3 md:justify-between md:items-start md:gap-4.5">
            {currentData?.footerItems.map((item) => {
              return (
                <Fragment key={item.name}>
                  {item.name !== "Home" && item.name !== "CompanyAlterName" && item.name !== "CompanyName" && (
                    <p className="footer-text" key={item.name}>
                      {item.label}
                    </p>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
