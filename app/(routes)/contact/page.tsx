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
  const companyEnglishTitle = data?.contact.find((item) => item.name === "公司英文名稱")?.label || "公司英文名稱";
  const address = data?.contact.find((item) => item.name === "公司地址")?.label || "公司地址";
  const openHours = data?.contact.find((item) => item.name === "營業時間")?.label || "營業時間";
  const paragraphClass = "text-center font-medium text-[10px] leading-[1.20] tracking-[0px] md:text-left md:text-sm md:leading-[1.26] md:tracking-[0.4px]";

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-15 font-notoSansTC md:grid-cols-2 md:gap-30 lg:gap-52">
        <div className="flex flex-col justify-center items-center md:items-start">
          <Image src="/images/contact_page_KV_pc.svg" width={462} height={462} alt="" className="w-full md:w-fit md:h-fit md:my-9 md:mx-15" />
        </div>
        <div className="flex flex-col justify-center items-center gap-5 md:items-start md:gap-7">
          <div className="flex flex-col justify-center items-center gap-1.5 md:items-start md:gap-1">
            <h2 className="text-center w-fit font-medium text-sm leading-[1.21] tracking-[0.3px] md:text-left md:font-bold md:text-lg md:leading-[1.24] md:tracking-[0.6px]">{companyTitle}</h2>
            <p className="text-center font-medium text-[11px] leading-[1.21] tracking-[0.3px] md:text-left md:text-sm md:leading-[1.24] md:tracking-[0.3px]">{companyEnglishTitle}</p>
          </div>
          <p className={paragraphClass}>{address}</p>
          <div className="flex flex-col items-center gap-2 md:items-start md:gap-2 w-fit">
            {data?.contact
              .filter((item) => ["聯絡電話", "傳真號碼", "電子信箱"].includes(item.name))
              .map((item) => (
                <p className={paragraphClass} key={item.name}>
                  {item.label}
                </p>
              ))}
          </div>
          <p className={paragraphClass}>{openHours}</p>
        </div>
      </div>
    </>
  );
}
