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
    <footer className="relative row-start-3 w-full font-notoSansTC">
      <Image src="/images/footer.svg" alt="" width={1440} height={37} className="absolute z-0 -left-0 -right-0 -top-[10px] sm:-top-[16px] md:-top-[20px] lg:-top-[30px] 2xl:-top-[40px] 3xl:-top-[60px] w-[150%]" />

      <div className="grid md:grid-cols-3 lg:grid-cols-3 pt-8 pb-10 px-6 md:pb-12 md:pt-16 md:px-28 w-full bg-primary text-stone-100 gap-4">
        <div className="order-2 md:order-1 relative flex flex-col gap-30 items-center md:items-start md:col-span-2 lg:col-span-2 justify-start">
          <Link href={homeItem?.href || ""} className="hidden w-fit md:flex">
            <Image src="/images/logo_mo.svg" alt="" width={182} height={132} className="" />
          </Link>
          <p className="text-[8px] text-center md:text-sm md:text-left">
            {companyEnglishNameItem?.label}&nbsp;©&nbsp;{year}. All rights reserved.
          </p>
        </div>
        <div className="order-1 md:order-2 relative flex flex-col text-center gap-5 md:justify-start md:items-start md:col-span-1 lg:col-span-1">
          <p className="text-[10px] font-bold md:text-xl md:font-medium">{companyNameItem?.label}</p>
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
