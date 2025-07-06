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
    <footer className="relative row-start-3 w-full ">
      <Image src="/images/footer.svg" alt="" width={1440} height={37} className="absolute z-0 -left-0 -right-0 -top-[16px] md:-top-[20px] lg:-top-[30px] 2xl:-top-[40px] 3xl:-top-[60px] w-[200%]" />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 py-5 px-6 md:py-12 md:px-16 w-full bg-primary text-stone-100 gap-4">
        <div className="relative flex flex-col gap-30 items-start md:items-start md:col-span-2 lg:col-span-2 justify-start">
          <Link href={homeItem?.href || ""} className="w-fit">
            <Image src="/images/logo_mo.svg" alt="" width={182} height={132} className="" />
          </Link>
          <p className="text-sm">
            {companyEnglishNameItem?.label}&nbsp;©&nbsp;{year}. All rights reserved.
          </p>
        </div>
        <div className="relative flex flex-col gap-5 justify-start items-start md:col-span-1 lg:col-span-1">
          <p className="text-xl font-medium">{companyNameItem?.label}</p>
          <div className="flex flex-col justify-start items-start font-medium md:justify-between md:items-start text-xs md:text-md lg:text-base w-full md:gap-3">
            {data?.footerItems.map((item) => {
              return <Fragment key={item.name}>{item.name !== "首頁" && item.name !== "公司英文名稱" && item.name !== "公司名稱" && <p key={item.name}>{item.label}</p>}</Fragment>;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
