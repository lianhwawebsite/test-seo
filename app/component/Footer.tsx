import NextBreadcrumb from "@/app/component/NextBreadcrumb";
import data from "@/data.json";
import Link from "next/link";
import { Fragment } from "react";

export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  const homeItem = data.footerItems.find((item) => item.name === "首頁");
  const companyNameItem = data.footerItems.find((item) => item.name === "公司名稱");
  return (
    <footer className="absolute bottom-0 row-start-3 w-full">
      <NextBreadcrumb />
      <div className="grid grid-cols-2 py-12 px-16  w-full bg-stone-700 text-stone-100">
        <div className="flex items-center">
          <Link href={homeItem?.href || ""} className="w-fit py-6 px-16 bg-stone-400 text-stone-500">
            {homeItem?.label}
          </Link>
        </div>
        <div className="flex flex-col gap-2 justify-center items-end">
          <div className="flex justify-between text-lg w-full">
            {data?.footerItems.map((item) => {
              return <Fragment key={item.name}>{item.name !== "首頁" && item.name !== "公司名稱" && <p key={item.name}>{item.label}</p>}</Fragment>;
            })}
          </div>
          <p className="text-sm">
            {companyNameItem?.label}&nbsp;©&nbsp;{year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
