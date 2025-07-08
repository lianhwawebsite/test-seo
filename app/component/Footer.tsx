import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  const homeItem = data.footerItems.find((item) => item.name === "首頁");
  const companyNameItem = data.footerItems.find((item) => item.name === "公司名稱");
  const companyEnglishNameItem = data.footerItems.find((item) => item.name === "公司英文名稱");
  return (
    <footer className="relative row-start-3 font-notoSansTC overflow-hidden flex items-center justify-center h-[205px] md:h-[421px]  w-screen">
      <Image src="/images/footer_pc.svg" alt="" fill sizes="(min-width: 768px) 100vw, 0px" className="object-top object-cover hidden md:block -z-10" priority />
      <Image src="/images/footer_mo.svg" alt="" fill sizes="(max-width: 767px) 100vw, 0px" className="object-top object-cover block md:hidden -z-10" priority />
      <div className="relative z-10 grid gap-6 h-fit w-full pt-9 pb-6 px-6 text-stone-100 md:grid-cols-3 md:pb-16 md:pt-34 md:px-28 lg:grid-cols-3">
        <div className="order-2 md:order-1 relative flex flex-col gap-30 items-center md:items-start md:col-span-2 lg:col-span-2 justify-start">
          <Link href={homeItem?.href || ""} className="hidden w-fit md:flex">
            <Image src="/images/logo_mo.svg" alt="" width={182} height={132} className="" />
          </Link>
          <p className="text-[8px] text-center md:text-sm md:text-left">
            {companyEnglishNameItem?.label}&nbsp;©&nbsp;{year}. All rights reserved.
          </p>
        </div>
        <div className="order-1 md:order-2 relative flex flex-col gap-2 md:justify-start md:items-start md:col-span-1 lg:col-span-1">
          <p className="text-[10px] text-center font-bold md:text-lg lg:text-xl md:font-medium">{companyNameItem?.label}</p>
          <div className="flex flex-col justify-start items-center text-[10px] gap-2 md:justify-between md:font-medium md:items-start md:text-md lg:text-base w-full md:gap-3">
            {data?.footerItems.map((item) => {
              return <Fragment key={item.name}>{item.name !== "首頁" && item.name !== "公司英文名稱" && item.name !== "公司名稱" && <p key={item.name}>{item.label}</p>}</Fragment>;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}