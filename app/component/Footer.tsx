import data from "@/data.json";
import Link from "next/link";
import { Fragment } from "react";

export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  const homeItem = data.footerItems.find((item) => item.name === "首頁");
  const companyNameItem = data.footerItems.find((item) => item.name === "公司名稱");
  return (
    <footer className="absolute z-10 bottom-0 row-start-3 w-full ">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 py-5 px-6 md:py-12 md:px-16 w-full bg-stone-700 text-stone-100 gap-4">
        <div className="flex items-start md:items-center md:col-span-1 lg:col-span-1 justify-start">
          <Link href={homeItem?.href || ""} className="w-fit py-6 px-24 bg-stone-400 text-stone-500">
            {homeItem?.label}
          </Link>
        </div>
        <div className="flex flex-col gap-2 justify-start md:justify-center items-start md:items-end md:col-span-2 lg:col-span-1">
          <div className="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-start text-xs md:text-md lg:text-base w-full md:gap-4">
            {data?.footerItems.map((item) => {
              return <Fragment key={item.name}>{item.name !== "首頁" && item.name !== "公司名稱" && <p key={item.name}>{item.label}</p>}</Fragment>;
            })}
          </div>
          <p className="text-xs sm:text-sm text-right md:text-left">
            {companyNameItem?.label}&nbsp;©&nbsp;{year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
