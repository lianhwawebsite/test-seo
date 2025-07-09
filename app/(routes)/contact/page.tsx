import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import data from "@/data.json";
import { Fragment } from "react";

export function generateMetadata() {
  const lang = "zh-TW"; 
  return getMetadata(lang, "contact");
}

export default function Page() {
  const schema = getSchema("contact");


  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <div className="mt-6 mb-20 flex flex-col gap-10 md:flex-row">
        <div className="grow bg-stone-300 w-full h-64 md:w-1/2 md:h-96"></div>
        <div className="grow px-6">
          {data?.footerItems.map((item) => {
            return <Fragment key={item.name}>{item.name !== "首頁" && item.name !== "公司名稱" && <p key={item.name}>{item.label}</p>}</Fragment>;
          })}
        </div>
      </div>
    </>
  );
}
