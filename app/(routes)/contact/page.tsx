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
      <div className="my-6">
        {data?.footerItems.map((item) => {
          return <Fragment key={item.name}>{item.name !== "首頁" && item.name !== "公司名稱" && <p key={item.name}>{item.label}</p>}</Fragment>;
        })}
      </div>
    </>
  );
}
