import { getMetadata, getSchema } from "@/app/lib/getMetadata";
import { SeoHead } from "@/app/component/SeoHead";
import data from "@/enData.json";
import Image from "next/image";

export function generateMetadata() {
  const lang = "en";
  return getMetadata(lang, "contact");
}

export default function Page() {
  const schema = getSchema("en", "contact");
  const companyTitle = data?.contact.find((item) => item.name === "CompanyName")?.label || "CompanyName";
  const companyEnglishTitle = data?.contact.find((item) => item.name === "CompanyAlterName")?.label || "CompanyAlterName";
  const address = data?.contact.find((item) => item.name === "Address")?.label || "Address";
  const openHours = data?.contact.find((item) => item.name === "OpeningHours")?.label || "OpeningHours";
  const [openHoursTitle, openHoursValue] = openHours.split("｜");
  const paragraphClass = "text-center text-[15px] font-light leading-[1.15] tracking-[0px] md:font-normal md:text-left md:text-sm md:leading-[1.26] md:tracking-[0.4px] md:font-notoSansTC";

  return (
    <>
      {schema && <SeoHead schema={schema} />}
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-15 md:grid-cols-2 md:gap-30 lg:gap-52">
        <div className="px-17.5 flex flex-col justify-center items-center md:items-start md:px-0">
          <Image src="/images/contact_page_KV_pc.svg" width={462} height={462} alt="" className="w-full md:w-fit md:h-fit md:my-9 md:mx-15" />
        </div>
        <div className="flex flex-col justify-center items-center gap-7  md:items-start md:mx-4 lg:mx-0 mx-9">
          <div className="flex flex-col justify-center items-center gap-1.5 mb-3 md:mb-0 md:items-start md:gap-1">
            <h2 className="text-center w-fit text-[18px] leading-[1.22] tracking-[0.3px] md:text-left font-bold md:text-lg md:leading-[1.24] md:tracking-[0.6px]">{companyTitle}</h2>
            <p className="text-center text-[15px] font-light leading-[1.15] tracking-[0.3px] md:font-medium md:text-left md:text-sm md:leading-[1.24] md:tracking-[0.3px]">{companyEnglishTitle}</p>
          </div>
          <p className={paragraphClass}>{address}</p>
          <div className="flex flex-col items-center gap-6 md:items-start md:gap-2 w-fit">
            {data?.contact
              .filter((item) => ["Tel", "Fax", "Email"].includes(item.name))
              .map((item) => {
                const [title, value] = item.label.split("｜");
                return (
                  <div key={item.name} className={paragraphClass}>
                    <span className="font-bold md:font-normal">{title}</span>
                    <span className="hidden md:inline">｜</span>
                    <span className="block md:inline">{value}</span>
                  </div>
                );
              })}
          </div>
          <div className={paragraphClass}>
            <span className="font-bold md:font-normal">{openHoursTitle}</span>
            <span className="hidden md:inline">｜</span>
            <span className="block md:inline">{openHoursValue}</span>
          </div>
        </div>
      </div>
    </>
  );
}
