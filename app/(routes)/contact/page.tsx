import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import data from "@/data.json";
import { Fragment } from "react";
import Image from "next/image";

export function generateMetadata() {
  const lang = "zh-TW"; 
  return getMetadata(lang, "contact");
}

export default function Page() {
  const schema = getSchema("contact");
const companyTitle = data?.contact.find((item) => item.name === "公司名稱")?.label || "公司名稱";

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-15 font-notoSansTC md:grid-cols-2 md:gap-30 lg:gap-52">
        <div className="flex flex-col justify-center items-center md:items-start">
          <Image src="/images/contact_page_KV_pc.svg" width={462} height={462} alt="" className="w-full md:w-fit md:h-fit md:my-9 md:mx-15" />
        </div>
        <div className="flex flex-col justify-center items-center gap-5 md:items-start md:gap-9">
          <h2 className="w-fit font-medium text-sm leading-[1.21] tracking-[0.3px] md:font-bold md:text-lg md:leading-[1.22] md:tracking-[0.6px]">{companyTitle}</h2>
          <div className="flex flex-col items-center gap-2 md:items-start md:gap-4 w-fit">
            {data?.contact.map((item) => {
              return (
                <Fragment key={item.name}>
                  {item.name !== "首頁" && item.name !== "公司名稱" && (
                    <p className="text-center font-medium text-xs leading-[1.22] tracking-[0px] md:text-left md:font-medium md:text-base md:leading-[1.36] md:tracking-[0.4px]" key={item.name}>
                      {item.label}
                    </p>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
