import { Service } from "@/app/lib/types";
import Image from "next/image";

export const ServiceSecond = ({ data }: { data: Service }) => {
  
  return (
    <div className="w-full bg-customGray md:bg-customGray-6">
      <div className="w-full flex flex-col md:grid mx-auto max-w-[1440px] gap-8 lg:gap-20 md:grid-rows-1 md:grid-cols-6 py-12 px-10 lg:py-16 lg:px-52">
        <div className="flex flex-col justify-center items-center gap-6 text-center md:row-span-1 md:col-span-3 md:text-left">
          <Image src="/images/home/landing_page_Service_pc.png" alt="" width={720} height={754} className="hidden h-fit md:block" />
          <Image src="/images/home/landing_page_Service_mo.png" alt="" width={720} height={754} className="block w-10/12 sm:w-2/4 md:hidden" />
        </div>
        <div className="md:col-span-3 text-sm text-center lg:text-base flex items-center md:font-medium md:text-left">{data.description}</div>
      </div>
    </div>
  );
};
